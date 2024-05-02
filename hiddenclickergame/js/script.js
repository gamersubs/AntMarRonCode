document.addEventListener('DOMContentLoaded', function() {
    let clickCount = 0;
    let clickMultiplier = 1;
    let clickMultiplierCost = 10;
    let autoClickerCost = 100;
    let autoClickerCount = 0;
    let autoClickerInterval;

    const clickButton = document.getElementById('clickButton');
    const clickCountDisplay = document.getElementById('clickCount');
    const clickMultiplierButton = document.getElementById('clickMultiplier');
    const autoClickerButton = document.getElementById('autoClicker');

    clickButton.addEventListener('click', () => {
        clickCount += clickMultiplier;
        updateClickCountDisplay();

    });

    clickMultiplierButton.addEventListener('click', () => {
        if (clickCount >= clickMultiplierCost) {
            clickCount -= clickMultiplierCost;
            clickMultiplier += 0.2;
            updateClickCountDisplay();
            clickMultiplierCost = Math.round(clickMultiplierCost * 1.6); // Increase the cost for next upgrade by 60%
            clickMultiplierButton.textContent = `Click Multiplier - Cost: ${clickMultiplierCost} clicks`;
        } else {
            alert('Not enough clicks to buy the click multiplier!');
        }
    });

    autoClickerButton.addEventListener('click', () => {
        if (clickCount >= autoClickerCost && autoClickerCount < 100) {
            clickCount -= autoClickerCost;
            updateClickCountDisplay();
            autoClickerCost = Math.round(autoClickerCost * 1.6); // Increase the cost for next upgrade by 60%
            autoClickerButton.textContent = `Auto Clicker - Cost: ${autoClickerCost} clicks`;
            autoClickerCount++;
            if (!autoClickerInterval) {
                autoClickerInterval = setInterval(() => {
                    clickCount += (0.2 * autoClickerCount);
                    updateClickCountDisplay();
                }, 1000);
            }
        } else if (autoClickerCount >= 100) {
            alert('You have reached the maximum limit of auto-clickers (100)!');
        } else {
            alert('Not enough clicks to buy the auto clicker!');
        }
    });

    function updateClickCountDisplay() {
        clickCountDisplay.textContent = clickCount.toFixed(1);
        document.cookie = "saveCount=clickCount"
    }    
});
