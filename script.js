let outputBuffer = [];

function addToOutput(message) {
    outputBuffer.push(message);
    updateOutput();
}

function updateOutput() {
    const outputDiv = document.getElementById('output');
    if (outputDiv) {
        outputDiv.innerHTML = outputBuffer.map(msg => 
            `<div class="output-line">${escapeHtml(msg)}</div>`
        ).join('');
        
        // Auto-scroll to bottom
        outputDiv.scrollTop = outputDiv.scrollHeight;
    }
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function clearOutput() {
    outputBuffer = [];
    updateOutput();
    document.getElementById('explanation').innerHTML = 'Output cleared. Click a button to run an exercise.';
}

function setExplanation(text) {
    const explanationDiv = document.getElementById('explanation');
    if (explanationDiv) {
        explanationDiv.innerHTML = text;
    }
}

function runExercise(number) {
    clearOutput();
    
    switch(number) {
        case 1:
            addToOutput('=== Exercise 1: Synchronous Execution ===\n');
            exercise1();
            setExplanation(`
                <strong>Synchronous Execution Explanation:</strong><br><br>
                JavaScript executes code synchronously by default, meaning one line at a time in order.
                Each console.log statement runs immediately in sequence: A → B → C.
                <br><br>
                <strong>Key Concept:</strong> The call stack processes each function call completely before moving to the next.
                This is blocking behavior - if one operation takes time, everything waits.
            `);
            break;
        case 2:
            addToOutput('=== Exercise 2: setTimeout (Macrotask) ===\n');
            exercise2();
            setExplanation(`
                <strong>setTimeout and Macrotasks Explanation:</strong><br><br>
                setTimeout schedules a callback to run after the specified delay (0ms here).
                Even with 0ms delay, it doesn't run immediately!<br><br>
                <strong>Why?</strong> setTimeout is a Web API. When called, it's moved to the Web API environment.
                After the timer expires, the callback goes to the Callback Queue (Macrotask Queue).
                The Event Loop only moves it to the Call Stack when the stack is empty.<br><br>
                <strong>Execution Order:</strong> Start → End → Timeout
            `);
            break;
        case 3:
            addToOutput('=== Exercise 3: Promises (Microtask) ===\n');
            exercise3();
            setExplanation(`
                <strong>Promises and Microtasks Explanation:</strong><br><br>
                Promise.then() callbacks are Microtasks, which have HIGHER priority than Macrotasks (setTimeout).<br><br>
                <strong>Execution Order:</strong> Start → End → Promise<br><br>
                <strong>Why?</strong> After each task in the Call Stack completes, the Event Loop checks the Microtask Queue
                first before moving to the Macrotask Queue. This ensures Promise callbacks execute as soon as possible.
            `);
            break;
        case 4:
            addToOutput('=== Exercise 4: Microtask vs Macrotask ===\n');
            exercise4();
            setExplanation(`
                <strong>Microtask vs Macrotask Priority:</strong><br><br>
                <strong>Execution Order:</strong> Start → End → Promise → Timeout<br><br>
                <strong>Why Promise runs before Timeout?</strong><br>
                1. Synchronous code runs first (console.logs)<br>
                2. Promise.then() goes to Microtask Queue (higher priority)<br>
                3. setTimeout goes to Macrotask Queue (lower priority)<br>
                4. Event Loop processes ALL Microtasks before ANY Macrotask<br><br>
                <strong>Queue Priority:</strong> Microtask Queue > Macrotask Queue
            `);
            break;
        case 5:
            addToOutput('=== Exercise 5: Async/Await ===\n');
            exercise5();
            setExplanation(`
                <strong>Async/Await Flow Explanation:</strong><br><br>
                <strong>Execution Order:</strong> 3 → 1 → 4 → 2<br><br>
                <strong>Step by step:</strong><br>
                1. console.log("3") runs first (synchronous)<br>
                2. test() is called, console.log("1") runs<br>
                3. await Promise.resolve() pauses the function<br>
                4. Control returns to caller, console.log("4") runs<br>
                5. After microtask queue empties, test() resumes<br>
                6. console.log("2") runs<br><br>
                <strong>Key Insight:</strong> await makes the function yield control, allowing other code to run.
            `);
            break;
        case 6:
            addToOutput('=== Exercise 6: Advanced Challenge ===\n');
            exercise6();
            setExplanation(`
                <strong>Advanced Challenge Explanation:</strong><br><br>
                <strong>Correct Output:</strong> A → D → C → B<br><br>
                <strong>Step by step analysis:</strong><br>
                1. console.log("A") - Synchronous, runs immediately<br>
                2. setTimeout(callback) - Goes to Web API, then Macrotask Queue<br>
                3. Promise.resolve().then() - Goes to Microtask Queue<br>
                4. console.log("D") - Synchronous, runs immediately<br>
                5. Call stack empty, Event Loop checks Microtask Queue first<br>
                6. Promise callback runs: console.log("C")<br>
                7. Event Loop checks Macrotask Queue<br>
                8. setTimeout callback runs: console.log("B")<br><br>
                <strong>Memory Aid:</strong> "A Dog Can't Bark" - A (sync), D (sync), C (Promise/micro), B (timeout/macro)
            `);
            break;
    }
}

// Log to console as well for developer tools
function addToOutput(message) {
    outputBuffer.push(message);
    updateOutput();
    console.log(message);
}

// Export for Node.js testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { addToOutput, clearOutput, runExercise };
}
