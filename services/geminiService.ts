
import { GoogleGenAI, GenerateContentResponse, Chat } from "@google/genai";
import { GEMINI_MODEL_NAME, GEMINI_CHATBOT_NAME } from '../constants';
import { ChatMessage } from "../types";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.error("API_KEY for Gemini is not set. Chatbot functionality will be disabled.");
  // Potentially show a user-facing message or disable chat features
}

const ai = API_KEY ? new GoogleGenAI({ apiKey: API_KEY }) : null;

const systemInstruction = `당신은 '${APP_NAME}' 가계부 앱의 친절하고 재치있는 AI 비서 '${GEMINI_CHATBOT_NAME}'입니다. 꿀벌 테마의 귀여운 노란색과 검은색 줄무늬가 있는 디지털 지폐 모습을 하고 있다고 상상해주세요. 
사용자의 질문에 대해 '${APP_NAME}' 앱의 기능, 사용법, 재테크 팁, 소비 분석에 대한 간단한 조언 등을 명확하고 짧게 답변해주세요. 사용자가 지출 내역에 대해 물으면, 앱의 '가계부' 탭에서 직접 확인하도록 안내해주세요. 데이터 접근 권한은 없습니다.
Google Sheets 동기화 기능에 대해 물으면, "현재 데이터는 사용자의 기기에만 안전하게 저장되며, Google Sheets 동기화 기능은 현재 지원되지 않지만, 개발팀에서 열심히 준비 중이니 조금만 기다려주세요! 윙윙!" 이라고 답변해주세요.
항상 긍정적이고 격려하는 말투를 사용하고, 답변 끝에 가끔 "윙윙!" 이나 "꿀팁!" 같은 추임새를 넣어주세요. 마크다운이나 코드 블록은 사용하지 마세요. 답변은 두세 문장 이내로 간결하게 해주세요.`;

let chat: Chat | null = null;

function initializeChat(): Chat | null {
  if (!ai) return null;
  if (!chat) {
     chat = ai.chats.create({
        model: GEMINI_MODEL_NAME,
        config: {
          systemInstruction: systemInstruction,
          // For potentially faster, more conversational responses for a chatbot
          // thinkingConfig: { thinkingBudget: 0 } // Consider if very low latency is critical
        },
      });
  }
  return chat;
}


export async function sendMessageToGemini(
  message: string,
  history: ChatMessage[]
): Promise<string> {
  if (!ai) {
    return "AI 서비스를 초기화할 수 없습니다. API 키가 설정되었는지 확인해주세요.";
  }
  
  const currentChat = initializeChat();
  if (!currentChat) {
     return "AI 챗봇 세션을 시작할 수 없습니다.";
  }

  try {
    // Reconstruct history for the API if needed, or rely on the stateful Chat object
    // For simplicity with the Chat object, we just send the new message.
    // If we weren't using `ai.chats.create`, we would pass history like:
    // const contents = history.map(msg => ({
    //   role: msg.sender === 'user' ? 'user' : 'model',
    //   parts: [{ text: msg.text }]
    // }));
    // contents.push({ role: 'user', parts: [{ text: message }] });
    // const response: GenerateContentResponse = await ai.models.generateContent({ model: GEMINI_MODEL_NAME, contents, systemInstruction });

    const response: GenerateContentResponse = await currentChat.sendMessage({ message });
    return response.text;
  } catch (error) {
    console.error("Error sending message to Gemini:", error);
    if (error instanceof Error && error.message.includes('API key not valid')) {
        return "API 키가 유효하지 않습니다. 설정을 확인해주세요. 윙윙~";
    }
    return "죄송합니다, 답변을 생성하는 중 오류가 발생했어요. 잠시 후 다시 시도해주세요. 윙윙...";
  }
}

export async function sendMessageToGeminiStream(
  message: string,
  onStreamChunk: (chunkText: string) => void,
  onStreamEnd: () => void,
  onError: (errorMessage: string) => void
): Promise<void> {
  if (!ai) {
    onError("AI 서비스를 초기화할 수 없습니다. API 키가 설정되었는지 확인해주세요.");
    onStreamEnd();
    return;
  }

  const currentChat = initializeChat();
  if (!currentChat) {
    onError("AI 챗봇 세션을 시작할 수 없습니다.");
    onStreamEnd();
    return;
  }
  
  try {
    const stream = await currentChat.sendMessageStream({ message });
    for await (const chunk of stream) {
      onStreamChunk(chunk.text);
    }
  } catch (error) {
    console.error("Error streaming message from Gemini:", error);
    if (error instanceof Error && error.message.includes('API key not valid')) {
        onError("API 키가 유효하지 않습니다. 설정을 확인해주세요. 윙윙~");
    } else {
        onError("죄송합니다, 답변을 스트리밍하는 중 오류가 발생했어요. 잠시 후 다시 시도해주세요. 윙윙...");
    }
  } finally {
    onStreamEnd();
  }
}

import { APP_NAME } from '../constants'; // Ensure APP_NAME is imported
