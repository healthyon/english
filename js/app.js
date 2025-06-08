// 전역 변수들
let currentTab = '전체';
let tasks = [];
let tabs = ['전체', '남편', '아내'];
let currentFilter = 'all';

// Google Sheets API 설정
const GOOGLE_SHEETS_ID = '1ekNvs8ZcttWD7FGSw1rU80fv1vseVp8we49u6ITjTJk';
const GOOGLE_SHEETS_URL = `https://docs.google.com/spreadsheets/d/${GOOGLE_SHEETS_ID}/gviz/tq?tqx=out:json`;

// Gemini API 설정
const GEMINI_API_KEY = 'AIzaSyACAoKxi4NsWm-zstIVpXLTh4apZmGz7Z0';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent';

// PWA 설치 관련
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    showInstallButton();
});

function showInstallButton() {
    const installButton = document.createElement('button');
    installButton.textContent = '앱 설치하기';
    installButton.className = 'btn btn-secondary';
    installButton.style.position = 'fixed';
    installButton.style.top = '20px';
    installButton.style.right = '20px';
    installButton.style.zIndex = '1001';
    
    installButton.addEventListener('click', async () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            deferredPrompt = null;
            installButton.remove();
        }
    });
    
    document.body.appendChild(installButton);
}

// 서비스 워커 등록 (안전한 방식)
function registerServiceWorker() {
    try {
        if ('serviceWorker' in navigator && window.location.protocol === 'https:') {
            navigator.serviceWorker.register('./sw.js')
                .then(registration => console.log('SW registered'))
                .catch(error => console.log('SW registration failed'));
        }
    } catch (error) {
        console.log('Service Worker not available in this environment');
    }
}

// 탭 관리 함수들
function addTab() {
    const newTabName = document.getElementById('newTabName').value.trim();
    if (newTabName && !tabs.includes(newTabName)) {
        tabs.push(newTabName);
        updateTabButtons();
        updateTaskTabOptions();
        document.getElementById('newTabName').value = '';
        saveTabs();
    }
}

function deleteCurrentTab() {
    if (currentTab === '전체') {
        alert('전체 탭은 삭제할 수 없습니다.');
        return;
    }
    
    if (confirm(`'${currentTab}' 탭을 삭제하시겠습니까?`)) {
        tabs = tabs.filter(tab => tab !== currentTab);
        tasks = tasks.filter(task => task.tab !== currentTab);
        currentTab = '전체';
        updateTabButtons();
        updateTaskTabOptions();
        displayTasks();
        saveTabs();
        saveTasks();
    }
}

function switchTab(tabName) {
    currentTab = tabName;
    updateTabButtons();
    displayTasks();
}

function updateTabButtons() {
    const container = document.getElementById('tabContainer');
    container.innerHTML = '';
    
    tabs.forEach(tab => {
        const button = document.createElement('button');
        button.className = 'tab' + (tab === currentTab ? ' active' : '');
        button.textContent = tab;
        button.onclick = () => switchTab(tab);
        container.appendChild(button);
    });
}

function updateTaskTabOptions() {
    const select = document.getElementById('taskTab');
    select.innerHTML = '';
    
    tabs.filter(tab => tab !== '전체').forEach(tab => {
        const option = document.createElement('option');
        option.value = tab;
        option.textContent = tab;
        select.appendChild(option);
    });
}

// 날짜 설정 함수들
function setToday() {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('taskDate').value = today;
}

function setTomorrow() {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    document.getElementById('taskDate').value = tomorrow.toISOString().split('T')[0];
}

// 할일 관리 함수들
function addTask() {
    const title = document.getElementById('taskTitle').value.trim();
    const description = document.getElementById('taskDescription').value.trim();
    const tab = document.getElementById('taskTab').value;
    const date = document.getElementById('taskDate').value;

    if (!title) {
        alert('할일 제목을 입력하세요.');
        return;
    }

    const task = {
        id: Date.now(),
        title,
        description,
        tab,
        date,
        completed: false,
        createdAt: new Date().toISOString()
    };

    tasks.push(task);
    displayTasks();
    saveTasks();
    
    // 폼 초기화
    document.getElementById('taskTitle').value = '';
    document.getElementById('taskDescription').value = '';
    setToday();
    
    // 애니메이션 효과
    const taskElements = document.querySelectorAll('.task-item');
    if (taskElements.length > 0) {
        taskElements[0].classList.add('fade-in');
    }
}

function toggleTask(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        task.completed = !task.completed;
        displayTasks();
        saveTasks();
    }
}

function deleteTask(taskId) {
    if (confirm('이 할일을 삭제하시겠습니까?')) {
        tasks = tasks.filter(t => t.id !== taskId);
        displayTasks();
        saveTasks();
    }
}

function filterTasks(filter) {
    currentFilter = filter;
    displayTasks();
}

function displayTasks() {
    const container = document.getElementById('tasks');
    let filteredTasks = tasks;

    // 탭 필터링
    if (currentTab !== '전체') {
        filteredTasks = filteredTasks.filter(task => task.tab === currentTab);
    }

    // 추가 필터링
    const today = new Date().toISOString().split('T')[0];
    const weekStart = new Date();
    weekStart.setDate(weekStart.getDate() - weekStart.getDay());
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 6);

    switch (currentFilter) {
        case 'today':
            filteredTasks = filteredTasks.filter(task => task.date === today);
            break;
        case 'week':
            filteredTasks = filteredTasks.filter(task => {
                const taskDate = new Date(task.date);
                return taskDate >= weekStart && taskDate <= weekEnd;
            });
            break;
        case 'completed':
            filteredTasks = filteredTasks.filter(task => task.completed);
            break;
    }

    // 날짜순 정렬
    filteredTasks.sort((a, b) => new Date(a.date) - new Date(b.date));

    container.innerHTML = '';

    if (filteredTasks.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #666; padding: 20px;">할일이 없습니다.</p>';
        return;
    }

    filteredTasks.forEach(task => {
        const taskElement = document.createElement('div');
        taskElement.className = 'task-item' + (task.completed ? ' completed' : '');
        
        const formattedDate = new Date(task.date).toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        taskElement.innerHTML = `
            <div>
                <h4>${task.title}</h4>
                ${task.description ? `<p>${task.description}</p>` : ''}
                <div class="task-meta">
                    <span>📅 ${formattedDate} | 📂 ${task.tab}</span>
                    <div class="task-actions">
                        <button class="btn btn-small ${task.completed ? 'btn-secondary' : 'btn-primary'}" onclick="toggleTask(${task.id})">
                            ${task.completed ? '취소' : '완료'}
                        </button>
                        <button class="btn btn-small btn-danger" onclick="deleteTask(${task.id})">삭제</button>
                    </div>
                </div>
            </div>
        `;

        container.appendChild(taskElement);
    });
}

// 데이터 저장/로드 함수들
function saveTasks() {
    localStorage.setItem('honeyTasks', JSON.stringify(tasks));
}

function loadTasks() {
    const saved = localStorage.getItem('honeyTasks');
    if (saved) {
        tasks = JSON.parse(saved);
        displayTasks();
    }
}

function saveTabs() {
    localStorage.setItem('honeyTabs', JSON.stringify(tabs));
}

function loadTabs() {
    const saved = localStorage.getItem('honeyTabs');
    if (saved) {
        tabs = JSON.parse(saved);
        updateTabButtons();
        updateTaskTabOptions();
    }
}

// 챗봇 관련 함수들
function toggleChat() {
    const chatWindow = document.getElementById('chatWindow');
    const isVisible = chatWindow.style.display === 'flex';
    chatWindow.style.display = isVisible ? 'none' : 'flex';
    
    if (!isVisible) {
        const chatToggle = document.querySelector('.chat-toggle');
        chatToggle.classList.add('pulse');
        setTimeout(() => chatToggle.classList.remove('pulse'), 2000);
    }
}

function handleChatKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

async function sendMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    
    if (!message) return;

    // 사용자 메시지 표시
    addChatMessage(message, 'user');
    input.value = '';

    // 로딩 표시
    const loadingMsg = addChatMessage('꿀버리가 생각 중이에요... 🤔', 'bot');
    
    try {
        // 현재 앱 상태 정보 수집
        const appContext = {
            currentTab: currentTab,
            totalTasks: tasks.length,
            completedTasks: tasks.filter(t => t.completed).length,
            todayTasks: tasks.filter(t => t.date === new Date().toISOString().split('T')[0]).length,
            tabs: tabs,
            recentTasks: tasks.slice(-3).map(t => ({title: t.title, tab: t.tab, completed: t.completed}))
        };

        const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: `당신은 '꿀버리'라는 이름의 귀여운 할일 관리 비서입니다. 
                        
현재 앱 상태:
- 현재 탭: ${appContext.currentTab}
- 전체 할일 수: ${appContext.totalTasks}개
- 완료된 할일: ${appContext.completedTasks}개
- 오늘 할일: ${appContext.todayTasks}개
- 사용 가능한 탭: ${appContext.tabs.join(', ')}
- 최근 할일: ${JSON.stringify(appContext.recentTasks)}

사용자 메시지: "${message}"

다음 규칙을 반드시 지켜주세요:
1. 항상 귀엽고 친근한 말투로 대답하세요
2. 이모지를 적절히 사용하세요 
3. 할일 관리와 관련된 조언을 해주세요
4. 코드나 마크다운 기호는 절대 사용하지 마세요
5. 응답은 3-4문장으로 간결하게 해주세요
6. 꿀벌이나 꿀과 관련된 표현을 자연스럽게 사용하세요
7. 부부가 함께 사용하는 앱임을 고려해서 대답하세요`
                    }]
                }]
            })
        });

        const data = await response.json();
        
        // 로딩 메시지 제거
        loadingMsg.remove();
        
        if (data.candidates && data.candidates[0] && data.candidates[0].content) {
            const botResponse = data.candidates[0].content.parts[0].text;
            addChatMessage(botResponse, 'bot');
        } else {
            addChatMessage('앗! 잠시 문제가 생겼어요 😅 다시 말씀해 주시겠어요?', 'bot');
        }
        
    } catch (error) {
        console.error('Gemini API 오류:', error);
        loadingMsg.remove();
        addChatMessage('앗! 네트워크에 문제가 있는 것 같아요 🐝 잠시 후 다시 시도해 주세요!', 'bot');
    }
}

function addChatMessage(text, sender) {
    const messagesContainer = document.getElementById('chatMessages');
    const messageElement = document.createElement('div');
    messageElement.className = `message ${sender}`;
    messageElement.textContent = text;
    
    messagesContainer.appendChild(messageElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    
    return messageElement;
}

// Google Sheets 연동 함수들 (향후 확장용)
async function syncWithGoogleSheets() {
    try {
        // 여기에 Google Sheets API 연동 로직 추가
        console.log('Google Sheets 동기화 기능은 추후 구현 예정입니다.');
    } catch (error) {
        console.error('Google Sheets 동기화 오류:', error);
    }
}

// 앱 초기화 시 실행
document.addEventListener('DOMContentLoaded', function() {
    setToday();
    loadTabs();
    loadTasks();
    updateTabButtons();
    updateTaskTabOptions();
    
    // 안전한 서비스워커 등록
    registerServiceWorker();
    
    // 환영 메시지
    setTimeout(() => {
        if (tasks.length === 0) {
            const chatToggle = document.querySelector('.chat-toggle');
            chatToggle.classList.add('pulse');
        }
    }, 2000);
});

// 오프라인 지원
window.addEventListener('online', function() {
    console.log('온라인 상태입니다.');
});

window.addEventListener('offline', function() {
    console.log('오프라인 상태입니다. 데이터는 로컬에 저장됩니다.');
});