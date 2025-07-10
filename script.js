let currentOperand = '';
        let previousOperand = '';
        let operation = undefined;
        let memoryValue = 0;
        let history = [];
        let isDarkTheme = true;
        
        const currentOperandElement = document.getElementById('currentOperand');
        const previousOperandElement = document.getElementById('previousOperand');
        const historyPanel = document.getElementById('historyPanel');
        const historyList = document.getElementById('historyList');
        
        function updateDisplay() {
            currentOperandElement.innerText = currentOperand || '0';
            if (operation != null) {
                previousOperandElement.innerText = `${previousOperand} ${operation}`;
            } else {
                previousOperandElement.innerText = previousOperand;
            }
        }
        
        function appendNumber(number) {
            if (number === '.' && currentOperand.includes('.')) return;
            currentOperand = currentOperand.toString() + number.toString();
            updateDisplay();
        }
        
        function chooseOperation(op) {
            if (currentOperand === '' && previousOperand !== '') {
                operation = op;
                updateDisplay();
                return;
            }
            if (currentOperand === '') return;
            if (previousOperand !== '') {
                calculate();
            }
            operation = op;
            previousOperand = currentOperand;
            currentOperand = '';
            updateDisplay();
        }
        
        function calculate() {
            let computation;
            const prev = parseFloat(previousOperand);
            const current = parseFloat(currentOperand);
            
            if (isNaN(prev) || isNaN(current)) return;
            
            switch (operation) {
                case '+':
                    computation = prev + current;
                    break;
                case '-':
                    computation = prev - current;
                    break;
                case '×':
                    computation = prev * current;
                    break;
                case '÷':
                    computation = prev / current;
                    break;
                default:
                    return;
            }
            
            const calculationString = `${previousOperand} ${operation} ${currentOperand} = ${computation}`;
            addToHistory(calculationString);
            
            currentOperand = computation.toString();
            operation = undefined;
            previousOperand = '';
            updateDisplay();
        }
        
        function clearAll() {
            currentOperand = '';
            previousOperand = '';
            operation = undefined;
            updateDisplay();
        }
        
        function percentage() {
            if (currentOperand === '') return;
            currentOperand = (parseFloat(currentOperand) / 100).toString();
            updateDisplay();
        }
        
        function sqrt() {
            if (currentOperand === '') return;
            currentOperand = Math.sqrt(parseFloat(currentOperand)).toString();
            updateDisplay();
            addToHistory(`√(${previousOperand || currentOperand}) = ${currentOperand}`);
            previousOperand = '';
        }
        
        function power(exp) {
            if (currentOperand === '') return;
            let computation;
            if (exp === 'y' && previousOperand) {
                computation = Math.pow(parseFloat(previousOperand), parseFloat(currentOperand));
                addToHistory(`${previousOperand}^${currentOperand} = ${computation}`);
                previousOperand = '';
            } else {
                computation = Math.pow(parseFloat(currentOperand), exp);
                addToHistory(`${currentOperand}^${exp} = ${computation}`);
            }
            currentOperand = computation.toString();
            updateDisplay();
        }
        
        function sin() {
            if (currentOperand === '') return;
            currentOperand = Math.sin(parseFloat(currentOperand) * Math.PI / 180).toString();
            updateDisplay();
            addToHistory(`sin(${previousOperand || currentOperand}) = ${currentOperand}`);
            previousOperand = '';
        }
        
        function cos() {
            if (currentOperand === '') return;
            currentOperand = Math.cos(parseFloat(currentOperand) * Math.PI / 180).toString();
            updateDisplay();
            addToHistory(`cos(${previousOperand || currentOperand}) = ${currentOperand}`);
            previousOperand = '';
        }
        
        function tan() {
            if (currentOperand === '') return;
            currentOperand = Math.tan(parseFloat(currentOperand) * Math.PI / 180).toString();
            updateDisplay();
            addToHistory(`tan(${previousOperand || currentOperand}) = ${currentOperand}`);
            previousOperand = '';
        }
        
        function log() {
            if (currentOperand === '' || parseFloat(currentOperand) <= 0) return;
            currentOperand = Math.log10(parseFloat(currentOperand)).toString();
            updateDisplay();
            addToHistory(`log(${previousOperand || currentOperand}) = ${currentOperand}`);
            previousOperand = '';
        }
        
        function ln() {
            if (currentOperand === '' || parseFloat(currentOperand) <= 0) return;
            currentOperand = Math.log(parseFloat(currentOperand)).toString();
            updateDisplay();
            addToHistory(`ln(${previousOperand || currentOperand}) = ${currentOperand}`);
            previousOperand = '';
        }
        
        function factorial() {
            if (currentOperand === '') return;
            let num = parseInt(currentOperand);
            if (num < 0) return;
            let result = 1;
            for (let i = 2; i <= num; i++) {
                result *= i;
            }
            currentOperand = result.toString();
            updateDisplay();
            addToHistory(`${num}! = ${currentOperand}`);
            previousOperand = '';
        }
        
        // Memory Functions
        function memoryClear() {
            memoryValue = 0;
        }
        
        function memoryRecall() {
            currentOperand = memoryValue.toString();
            updateDisplay();
        }
        
        function memoryAdd() {
            if (currentOperand === '') return;
            memoryValue += parseFloat(currentOperand);
        }
        
        function memorySubtract() {
            if (currentOperand === '') return;
            memoryValue -= parseFloat(currentOperand);
        }
        
        // History Functions
        function addToHistory(calculation) {
            history.unshift(calculation);
            if (history.length > 10) history.pop();
            updateHistoryDisplay();
        }
        
        function updateHistoryDisplay() {
            historyList.innerHTML = '';
            history.forEach((item, index) => {
                const historyItem = document.createElement('div');
                historyItem.className = 'history-item p-2 rounded hover:bg-gray-800';
                historyItem.innerHTML = `<div class="text-gray-400 text-sm">${index + 1}.</div><div>${item}</div>`;
                historyItem.onclick = () => {
                    const result = item.split('=')[1].trim();
                    currentOperand = result;
                    updateDisplay();
                    historyPanel.classList.remove('open');
                };
                historyList.appendChild(historyItem);
            });
        }
        
        function clearHistory() {
            history = [];
            updateHistoryDisplay();
        }
        
        // Toggle History Panel
        document.getElementById('historyBtn').addEventListener('click', () => {
            historyPanel.classList.add('open');
        });
        
        document.getElementById('closeHistory').addEventListener('click', () => {
            historyPanel.classList.remove('open');
        });
        
        document.getElementById('clearHistory').addEventListener('click', clearHistory);
        
        // Toggle Theme
        document.getElementById('themeBtn').addEventListener('click', () => {
            isDarkTheme = !isDarkTheme;
            document.body.classList.toggle('bg-gray-100');
            document.body.classList.toggle('text-gray-900');
            document.body.classList.toggle('bg-gray-900');
            document.body.classList.toggle('text-white');
        });
        
        // Keyboard Support
        document.addEventListener('keydown', (e) => {
            if (e.key >= 0 && e.key <= 9 || e.key === '.') appendNumber(e.key);
            else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
                let op;
                if (e.key === '*') op = '×';
                else if (e.key === '/') op = '÷';
                else op = e.key;
                chooseOperation(op);
            }
            else if (e.key === 'Enter' || e.key === '=') calculate();
            else if (e.key === 'Escape') clearAll();
            else if (e.key === '%') percentage();
            else if (e.key === 'Backspace') {
                currentOperand = currentOperand.slice(0, -1);
                if (currentOperand === '') currentOperand = '0';
                updateDisplay();
            }
        });
        
        // Initialize
        updateDisplay();