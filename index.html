<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="manifest" href="manifest.json" />
    <meta name="theme-color" content="#3B82F6" />
    <title>AI 영어 문장 학습</title>

    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/framer-motion@10/dist/framer-motion.umd.min.js"></script>
    
    <style>
        .toggle-checkbox:checked { right: 0; border-color: #3B82F6; }
        .toggle-checkbox:checked + .toggle-label { background-color: #3B82F6; }
        .range-thumb::-webkit-slider-thumb { -webkit-appearance: none; appearance: none; width: 20px; height: 20px; background: #3B82F6; cursor: pointer; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 2px rgba(0,0,0,0.3); }
        .range-thumb::-moz-range-thumb { width: 20px; height: 20px; background: #3B82F6; cursor: pointer; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 2px rgba(0,0,0,0.3); }
    </style>
</head>
<body>
    <div id="root"></div>

    <script type="text/babel">
        const { useState, useEffect, useMemo, useCallback, useRef } = React;
        const { motion, AnimatePresence } = framer;

        // --- 컴포넌트 ---
        const Header = ({ currentPlace, onSettingsClick, currentIndex, totalCount }) => (
            <div className="flex justify-between items-center p-4">
                <div className="flex items-center"><h1 className="text-2xl font-bold text-gray-800">{currentPlace}</h1>{totalCount > 0 && (<span className="ml-3 text-sm font-medium text-gray-500 bg-gray-200 px-2 py-1 rounded-full">{currentIndex + 1} / {totalCount}</span>)}</div>
                <button onClick={onSettingsClick} className="p-2 rounded-full hover:bg-gray-200 transition-colors"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg></button>
            </div>
        );

        const SentenceCard = ({ sentence, settings, onFavorite, isFavorite, onAnalyze, onRoleplay }) => {
            if (!sentence) return (<div className="bg-white rounded-2xl shadow-lg p-6 m-4 flex-grow flex flex-col justify-center items-center"><p className="text-gray-500">이 조건에 맞는 문장이 없습니다.</p></div>);
            return (
                <motion.div key={sentence.id} initial={{ opacity: 0, y: 20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -20, scale: 0.95 }} transition={{ duration: 0.4, ease: "easeInOut" }} className="bg-white rounded-2xl shadow-lg p-6 m-4 flex-grow flex flex-col justify-between">
                    <div>
                        <div className="flex justify-between items-start">
                            <p className="text-2xl md:text-3xl font-semibold text-gray-800 leading-tight pr-4">{sentence.english}</p>
                            <button onClick={() => onFavorite(sentence.id)} className="p-1 -mr-2 -mt-2 flex-shrink-0"><svg xmlns="http://www.w3.org/2000/svg" className={`h-7 w-7 transition-colors ${isFavorite ? 'text-yellow-400' : 'text-gray-300 hover:text-yellow-300'}`} viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg></button>
                        </div>
                        <AnimatePresence>{settings.showTranslation && (<motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }} className="text-gray-500 mt-4 text-lg">{sentence.korean}</motion.p>)}</AnimatePresence>
                    </div>
                    <div className="w-full">
                        <AnimatePresence>{settings.showWords && sentence.words && (<motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} transition={{ duration: 0.3, delay: 0.1 }} className="my-6 pt-4 border-t border-gray-100"><h3 className="font-bold text-gray-600 mb-2">주요 단어</h3><ul className="space-y-1">{sentence.words.map((word, index) => (<li key={index} className="text-gray-700"><span className="font-semibold">{word.word}</span>: {word.meaning}</li>))}</ul></motion.div>)}</AnimatePresence>
                        <div className="flex gap-2 pt-4 border-t border-gray-100">
                            <button onClick={() => onAnalyze(sentence.english)} className="flex-1 py-2 px-3 bg-blue-100 text-blue-700 rounded-lg font-semibold text-sm hover:bg-blue-200 transition-colors flex items-center justify-center gap-2">✨ 문장 분석</button>
                            <button onClick={() => onRoleplay(sentence.english)} className="flex-1 py-2 px-3 bg-purple-100 text-purple-700 rounded-lg font-semibold text-sm hover:bg-purple-200 transition-colors flex items-center justify-center gap-2">✨ 롤플레이</button>
                        </div>
                    </div>
                </motion.div>
            );
        };

        const Controls = ({ onPrev, onNext, onPlay, isSpeaking, disabled }) => (
            <div className="flex justify-center items-center space-x-8 p-4"><button onClick={onPrev} disabled={disabled} className="p-3 rounded-full bg-white shadow-md hover:bg-gray-50 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg></button><button onClick={onPlay} disabled={disabled} className={`p-5 rounded-full bg-blue-500 text-white shadow-lg hover:bg-blue-600 active:scale-95 transition-all transform disabled:opacity-50 disabled:cursor-not-allowed ${isSpeaking ? 'scale-110 bg-blue-700' : ''}`}><svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></button><button onClick={onNext} disabled={disabled} className="p-3 rounded-full bg-white shadow-md hover:bg-gray-50 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></button></div>
        );

        const SettingsSheet = ({ isOpen, onClose, settings, onSettingsChange, places, onCopyFavorites, copyStatus }) => (
            <AnimatePresence>{isOpen && (<>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-black bg-opacity-50 z-40" />
                <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ type: "spring", stiffness: 300, damping: 30 }} className="fixed bottom-0 left-0 right-0 bg-gray-100 rounded-t-2xl p-6 z-50 max-w-md mx-auto overflow-y-auto max-h-[90vh]">
                    <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-4"></div><h2 className="text-xl font-bold text-center mb-6">설정</h2>
                    <div className="space-y-6">
                        <div><label className="text-sm font-medium text-gray-600">장소</label><select value={settings.place} onChange={e => onSettingsChange('place', e.target.value)} className="w-full mt-1 p-3 bg-white rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none">{places.map(p => <option key={p} value={p}>{p}</option>)}</select></div>
                        <div><label className="text-sm font-medium text-gray-600">난이도</label><div className="flex justify-between mt-1 space-x-2">{['종합', '초급', '중급', '고급'].map(level => (<button key={level} onClick={() => onSettingsChange('difficulty', level)} className={`w-full py-2 rounded-lg text-sm font-semibold transition-colors ${settings.difficulty === level ? 'bg-blue-500 text-white' : 'bg-white hover:bg-gray-50'}`}>{level}</button>))}</div></div>
                        <div><label className="text-sm font-medium text-gray-600 flex justify-between"><span>자동 넘김 (초)</span><span className="font-bold text-blue-500">{settings.timer === 0 ? '꺼짐' : `${settings.timer}초`}</span></label><input type="range" min="0" max="10" step="1" value={settings.timer} onChange={e => onSettingsChange('timer', parseInt(e.target.value))} className="w-full mt-2 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer range-thumb" /></div>
                        <div><label className="text-sm font-medium text-gray-600 flex justify-between"><span>듣기 속도</span><span className="font-bold text-blue-500">{settings.ttsSpeed.toFixed(1)}배속</span></label><input type="range" min="0.5" max="1.5" step="0.1" value={settings.ttsSpeed} onChange={e => onSettingsChange('ttsSpeed', parseFloat(e.target.value))} className="w-full mt-2 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer range-thumb" /></div>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center bg-white p-3 rounded-lg"><label htmlFor="showTranslation" className="text-gray-700">한글 해설 보기</label><div className={`relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in`}><input type="checkbox" id="showTranslation" checked={settings.showTranslation} onChange={e => onSettingsChange('showTranslation', e.target.checked)} className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"/><label htmlFor="showTranslation" className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label></div></div>
                            <div className="flex justify-between items-center bg-white p-3 rounded-lg"><label htmlFor="showWords" className="text-gray-700">주요 단어 보기</label><div className={`relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in`}><input type="checkbox" id="showWords" checked={settings.showWords} onChange={e => onSettingsChange('showWords', e.target.checked)} className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"/><label htmlFor="showWords" className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label></div></div>
                        </div>
                        <div><button onClick={onCopyFavorites} className="w-full py-3 bg-white border border-gray-300 text-gray-700 rounded-xl font-bold hover:bg-gray-50 active:scale-95 transition-all">{copyStatus ? copyStatus : '⭐ 즐겨찾기 복사'}</button></div>
                    </div><button onClick={onClose} className="w-full mt-6 py-3 bg-blue-500 text-white rounded-xl font-bold hover:bg-blue-600 active:scale-95 transition-all">닫기</button>
                </motion.div></>)}
            </AnimatePresence>
        );

        const MarkdownRenderer = ({ text }) => {
            const html = text
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                .replace(/\*(.*?)\*/g, '<strong>$1</strong>') 
                .replace(/(\r\n|\n|\r)/gm, "<br>");
            return <div dangerouslySetInnerHTML={{ __html: html }} />;
        };

        const GeminiModal = ({ isOpen, onClose, title, content, isLoading, onSpeak, onNext }) => (
            <AnimatePresence>{isOpen && (<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4" onClick={onClose}>
                <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} onClick={(e) => e.stopPropagation()} className="bg-white rounded-2xl shadow-xl w-full max-w-md max-h-[80vh] flex flex-col">
                    <div className="flex justify-between items-center p-4 border-b border-gray-200">
                        <h3 className="text-lg font-bold text-gray-800">{title}</h3>
                        <div className="flex items-center gap-2">
                           <button onClick={onSpeak} className="p-2 rounded-full hover:bg-gray-200" title="내용 듣기">🔊</button>
                           <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-200"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
                        </div>
                    </div>
                    <div className="p-6 overflow-y-auto whitespace-pre-wrap flex-grow">
                        {isLoading ? (
                            <div className="flex flex-col items-center justify-center h-full"><svg className="animate-spin h-6 w-6 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg><p className="mt-4 text-gray-500">AI가 답변을 생성 중입니다...</p></div>
                        ) : (
                            <div className="text-gray-700 leading-relaxed"><MarkdownRenderer text={content} /></div>
                        )}
                    </div>
                    <div className="p-4 border-t border-gray-200">
                        <button onClick={onNext} className="w-full py-2 px-4 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition-colors"➡️ 다음 문장</button>
                    </div>
                </motion.div></motion.div>)}
            </AnimatePresence>
        );

        function EnglishLearningApp() {
            const [allSentences, setAllSentences] = useState([]);
            const [appState, setAppState] = useState({ status: 'loading', message: '영어 문장을 불러오는 중...' });
            const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
            const [isSettingsOpen, setIsSettingsOpen] = useState(false);
            const [favorites, setFavorites] = useState([]);
            const [isSpeaking, setIsSpeaking] = useState(false);
            const [copyStatus, setCopyStatus] = useState('');
            const [isModalOpen, setIsModalOpen] = useState(false);
            const [modalContent, setModalContent] = useState('');
            const [modalTitle, setModalTitle] = useState('');
            const [isModalLoading, setIsModalLoading] = useState(false);
            const [settings, setSettings] = useState(() => { const saved = typeof window !== 'undefined' ? localStorage.getItem('englishAppSettings') : null; return saved ? JSON.parse(saved) : { place: '종합', difficulty: '종합', timer: 0, showTranslation: true, showWords: true, ttsSpeed: 0.9 }; });
            const timerRef = useRef(null);
            const [ttsVoice, setTtsVoice] = useState(null);
            const [koreanTtsVoice, setKoreanTtsVoice] = useState(null);

            useEffect(() => {
                if ('serviceWorker' in navigator) {
                    window.addEventListener('load', () => { navigator.serviceWorker.register('./service-worker.js').then(reg => console.log('SW registered.')).catch(err => console.log('SW registration failed: ', err)); });
                }
            }, []);

            useEffect(() => {
                const fetchSentences = async () => {
                    setAppState({ status: 'loading', message: 'Gemini AI와 연결 중...' });
                    const apiKey = 'AIzaSyACAoKxi4NsWm-zstIVpXLTh4apZmGz7Z0';
                    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
                    const prompt = `아래 10개의 장소 목록에서 중복되지 않는 4개의 장소를 무작위로 선택해줘: ['공항', '카페', '식당', '호텔', '쇼핑몰', '지하철', '버스', '도서관', '영화관', '병원']. 선택된 각 장소마다, 실생활에서 자주 사용하는 영어 문장을 10개씩 생성해줘. 각 문장은 난이도('초급', '중급', '고급')를 포함해야 하고, 전체 40개의 문장과 장소는 서로 중복되면 안 돼. 반드시 아래와 같은 JSON 형식의 배열로만 응답해야 해. 다른 설명은 절대 추가하지 마. [{"id": "unique_string_id_1", "place": "선택된 장소", "difficulty": "난이도", "english": "영어 문장", "korean": "한국어 번역", "words": [{"word": "주요 단어", "meaning": "단어 뜻"}]}]`;
                    const payload = { contents: [{ parts: [{ text: prompt }] }], generationConfig: { responseMimeType: "application/json" } };
                    try {
                        setAppState({ status: 'loading', message: 'AI가 문장을 생성 중입니다...' });
                        const response = await fetch(apiUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
                        const result = await response.json();
                        if (!response.ok) throw new Error(result?.error?.message || '알 수 없는 오류');
                        if (result.candidates?.length > 0) {
                            const parsedSentences = JSON.parse(result.candidates[0].content.parts[0].text);
                            const cleanedSentences = parsedSentences.map((s, i) => ({ ...s, id: `${s.place?.trim() || 'unknown'}-${s.difficulty?.trim() || 'unknown'}-${i}`, place: s.place?.trim(), difficulty: s.difficulty?.trim() }));
                            setAllSentences(cleanedSentences); setAppState({ status: 'success', message: '성공' });
                        } else { throw new Error("API로부터 유효한 문장을 받지 못했습니다."); }
                    } catch (error) { console.error("Failed to fetch from Gemini:", error); setAppState({ status: 'error', message: `문장 생성 실패: ${error.message}` }); }
                };
                fetchSentences();
            }, []);

            useEffect(() => { localStorage.setItem('englishAppSettings', JSON.stringify(settings)); }, [settings]);
            useEffect(() => { const saved = localStorage.getItem('englishAppFavorites'); if (saved) setFavorites(JSON.parse(saved)); }, []);
            useEffect(() => {
                const loadVoices = () => {
                    if (typeof window.speechSynthesis === 'undefined') return;
                    const voices = window.speechSynthesis.getVoices();
                    setTtsVoice(voices.find(v => v.lang.startsWith('en-US') && v.name.includes('Female')) || voices.find(v => v.lang.startsWith('en-US')));
                    setKoreanTtsVoice(voices.find(v => v.lang.startsWith('ko-KR')));
                };
                loadVoices(); if (window.speechSynthesis.onvoiceschanged !== undefined) { window.speechSynthesis.onvoiceschanged = loadVoices; }
            }, []);
            
            const filteredSentences = useMemo(() => {
                if (appState.status !== 'success') return [];
                let result = [...allSentences];
                if (settings.place !== '종합') result = result.filter(s => s.place === settings.place);
                if (settings.difficulty !== '종합') result = result.filter(s => s.difficulty === settings.difficulty);
                if (settings.difficulty === '종합') {
                    const difficultyOrder = { '초급': 1, '중급': 2, '고급': 3 };
                    result.sort((a, b) => (difficultyOrder[a.difficulty] || 99) - (difficultyOrder[b.difficulty] || 99));
                } else { for (let i = result.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [result[i], result[j]] = [result[j], result[i]]; } }
                return result;
            }, [allSentences, settings.place, settings.difficulty, appState.status]);

            const places = useMemo(() => { if (allSentences.length === 0) return ['종합']; return ['종합', ...new Set(allSentences.map(s => s.place))]; }, [allSentences]);
            
            const currentSentence = filteredSentences[currentSentenceIndex];
            const handleNext = useCallback(() => { if(filteredSentences.length === 0) return; setCurrentSentenceIndex(p => (p + 1) % filteredSentences.length); }, [filteredSentences.length]);
            const handlePrev = () => { if(filteredSentences.length === 0) return; setCurrentSentenceIndex(p => (p - 1 + filteredSentences.length) % filteredSentences.length); };
            
            const speakText = (text, lang, rate, voice) => {
                if (!text || typeof window.speechSynthesis === 'undefined') return;
                window.speechSynthesis.cancel();
                const utterance = new SpeechSynthesisUtterance(text);
                if (voice) utterance.voice = voice;
                utterance.lang = lang;
                utterance.rate = rate;
                utterance.onstart = () => setIsSpeaking(true);
                utterance.onend = () => setIsSpeaking(false);
                utterance.onerror = () => setIsSpeaking(false);
                window.speechSynthesis.speak(utterance);
            };

            const handlePlay = () => speakText(currentSentence?.english, 'en-US', settings.ttsSpeed, ttsVoice);
            const handleSettingsChange = (key, value) => { setSettings(p => ({ ...p, [key]: value })); if (key !== 'timer' && key !== 'ttsSpeed') setCurrentSentenceIndex(0); };
            const handleFavorite = (id) => { if(!id) return; setFavorites(p => { const n = p.includes(id) ? p.filter(i => i !== id) : [...p, id]; localStorage.setItem('englishAppFavorites', JSON.stringify(n)); return n; }); };
            const handleCopyFavorites = () => {
                if (favorites.length === 0) { setCopyStatus('즐겨찾기 없음'); setTimeout(() => setCopyStatus(''), 2000); return; }
                const textToCopy = allSentences.filter(s => favorites.includes(s.id)).map(s => `English: ${s.english}\nKorean: ${s.korean}`).join('\n\n');
                const ta = document.createElement('textarea'); ta.value = textToCopy; document.body.appendChild(ta); ta.select();
                try { document.execCommand('copy'); setCopyStatus('복사 완료!'); } catch (err) { setCopyStatus('복사 실패'); }
                document.body.removeChild(ta); setTimeout(() => setCopyStatus(''), 2000);
            };

            const callGemini = async (prompt) => {
                setIsModalLoading(true);
                const apiKey = 'AIzaSyACAoKxi4NsWm-zstIVpXLTh4apZmGz7Z0';
                const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
                const payload = { contents: [{ parts: [{ text: prompt }] }] };
                try {
                    const response = await fetch(apiUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
                    const result = await response.json();
                    if (!response.ok) throw new Error(result?.error?.message || 'AI 응답 오류');
                    setModalContent(result.candidates[0].content.parts[0].text);
                } catch (error) { setModalContent(`오류가 발생했습니다: ${error.message}`); } finally { setIsModalLoading(false); }
            };

            const handleAnalyzeSentence = (sentence) => { setModalTitle('✨ 문장 분석'); setModalContent(''); setIsModalOpen(true); const prompt = `당신은 친절한 영어 선생님입니다. 다음 영어 문장을 문법, 주요 표현, 뉘앙스에 초점을 맞춰 한국어로 심층 분석하고 설명해주세요. 학습자가 이해하기 쉽게 단계별로 나눠서 설명해주세요:\n\n"${sentence}"`; callGemini(prompt); };
            const handleGenerateRoleplay = (sentence) => { setModalTitle('✨ 롤플레이 대화'); setModalContent(''); setIsModalOpen(true); const prompt = `다음 영어 문장이 사용될 수 있는 자연스러운 롤플레이 대화문을 영어와 한국어 번역으로 생성해주세요. Speaker A와 Speaker B가 등장하는 짧은 대화 형식이어야 합니다:\n\n"${sentence}"`; callGemini(prompt); };
            const handleModalNext = () => { setIsModalOpen(false); setTimeout(() => handleNext(), 150); };

            useEffect(() => { if (timerRef.current) clearInterval(timerRef.current); if (settings.timer > 0 && filteredSentences.length > 0) { timerRef.current = setInterval(handleNext, settings.timer * 1000); } return () => { if (timerRef.current) clearInterval(timerRef.current); }; }, [settings.timer, handleNext, filteredSentences.length]);
            
            if (appState.status === 'loading') return (<div className="font-sans bg-gray-50 h-screen w-screen flex items-center justify-center"><div className="flex flex-col items-center space-y-4 text-center px-4"><svg className="animate-spin h-8 w-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg><div className="text-lg font-semibold text-gray-600">{appState.message}</div></div></div>);
            if (appState.status === 'error') return (<div className="font-sans bg-gray-50 h-screen w-screen flex items-center justify-center"><div className="flex flex-col items-center space-y-4 text-center px-8"><svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg><h2 className="text-xl font-bold text-gray-800">오류가 발생했습니다</h2><p className="text-sm text-gray-500 bg-red-100 p-2 rounded-md">{appState.message}</p><p className="text-sm text-gray-500">API 키가 유효한지, Google Cloud 프로젝트에서 Generative Language API가 활성화되었는지 확인해 주세요.</p><button onClick={() => window.location.reload()} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors">다시 시도</button></div></div>);

            return (
                <div className="font-sans bg-gray-50 h-screen w-screen flex items-center justify-center">
                    <div className="relative w-full max-w-md h-full md:h-[90vh] md:max-h-[800px] bg-gray-100 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
                        <Header currentPlace={settings.place} onSettingsClick={() => setIsSettingsOpen(true)} currentIndex={currentSentenceIndex} totalCount={filteredSentences.length} />
                        <main className="flex-grow flex flex-col justify-center min-h-0">
                            <AnimatePresence mode="wait"><SentenceCard sentence={currentSentence} settings={settings} onFavorite={handleFavorite} isFavorite={favorites.includes(currentSentence?.id)} onAnalyze={handleAnalyzeSentence} onRoleplay={handleGenerateRoleplay} /></AnimatePresence>
                        </main>
                        <Controls onPrev={handlePrev} onNext={handleNext} onPlay={handlePlay} isSpeaking={isSpeaking} disabled={filteredSentences.length === 0} />
                        <SettingsSheet isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} settings={settings} onSettingsChange={handleSettingsChange} places={places} onCopyFavorites={handleCopyFavorites} copyStatus={copyStatus} />
                        <GeminiModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={modalTitle} content={modalContent} isLoading={isModalLoading} onSpeak={() => speakText(modalContent, 'ko-KR', 1.0, koreanTtsVoice)} onNext={handleModalNext} />
                    </div>
                </div>
            );
        }

        const root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(<EnglishLearningApp />);
    </script>
</body>
</html>
