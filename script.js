document.addEventListener('DOMContentLoaded', function() {
    // ASCII logo smooth reveal animation for both main and page logos
    const asciiLogo = document.querySelector('.ascii-logo') || document.querySelector('.page-ascii-logo');
    if (asciiLogo) {
        const fullText = asciiLogo.getAttribute('data-text');
        const lines = fullText.split('|');
        
        // Create HTML with spans for each character
        asciiLogo.innerHTML = '';
        const charElements = [];
        
        lines.forEach((line, lineIndex) => {
            const lineDiv = document.createElement('div');
            
            [...line].forEach((char, charIndex) => {
                const span = document.createElement('span');
                span.className = 'ascii-char';
                span.textContent = char === ' ' ? '\u00A0' : char;  // Use non-breaking space
                
                if (char !== ' ') {
                    charElements.push({
                        element: span,
                        line: lineIndex,
                        position: charIndex
                    });
                } else {
                    span.style.opacity = '1';  // Spaces are always visible
                }
                
                lineDiv.appendChild(span);
            });
            
            asciiLogo.appendChild(lineDiv);
        });
        
        // Group characters by letter position
        // For main logo: S-T-A-I-P-L-E (7 letters)
        // For other pages: dynamically sized
        const logoText = asciiLogo.getAttribute('data-text');
        const letterCount = logoText.split('|')[0].replace(/[╔═╗╦╚║╠╣╝╩ ]/g, '').length || 10;
        const letterGroups = Array.from({length: letterCount}, () => []);
        
        // Map character positions to letters
        charElements.forEach(char => {
            const pos = char.position;
            
            // For page logos (NOTE, PORTFOLIO), use simpler mapping
            if (asciiLogo.classList.contains('page-ascii-logo')) {
                // Each letter is approximately 3 characters wide
                const letterIndex = Math.floor(pos / 3);
                if (letterGroups[letterIndex]) {
                    letterGroups[letterIndex].push(char);
                }
            } else {
                // STAIPLE specific mapping
                if (pos >= 0 && pos <= 2) {
                    letterGroups[0].push(char); // S
                } else if (pos >= 3 && pos <= 5) {
                    letterGroups[1].push(char); // T
                } else if (pos >= 6 && pos <= 8) {
                    letterGroups[2].push(char); // A
                } else if (pos === 9) {
                    letterGroups[3].push(char); // I
                } else if (pos >= 10 && pos <= 12) {
                    letterGroups[4].push(char); // P
                } else if (pos >= 13 && pos <= 15) {
                    letterGroups[5].push(char); // L
                } else if (pos >= 16 && pos <= 19) {
                    letterGroups[6].push(char); // E
                }
            }
        });
        
        let currentLetter = 0;
        
        function revealNextLetter() {
            if (currentLetter < letterGroups.length) {
                const group = letterGroups[currentLetter];
                
                // Reveal all characters in this letter with much longer delays
                // Each character within a letter should take 200ms apart
                group.forEach((char, index) => {
                    setTimeout(() => {
                        char.element.classList.add('revealed');
                    }, index * 200);
                });
                
                currentLetter++;
                
                // Quick transition to next letter (100ms)
                // This way S takes 600ms to build (3 chars * 200ms)
                // And E starts at 600ms (6 letters * 100ms)
                const delayBetweenLetters = 100;
                setTimeout(revealNextLetter, delayBetweenLetters);
            } else {
                // Start typewriter effect after ASCII is revealed
                setTimeout(startTypewriter, 500);
            }
        }
        
        // Start revealing after a short delay
        setTimeout(revealNextLetter, 500);
    }
    
    function startTypewriter() {
        const typewriters = document.querySelectorAll('.typewriter');
        
        typewriters.forEach(element => {
            const text = element.getAttribute('data-text');
            element.textContent = '';
            typeWriter(element, text, 0);
        });
    }
    
    function typeWriter(element, text, index) {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            setTimeout(() => typeWriter(element, text, index + 1), 100);
        }
    }
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            }
        });
    });
    
    
    // Add subtle parallax effect
    let ticking = false;
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
        
        ticking = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(updateParallax);
            ticking = true;
        }
    });
});

// Add glitch animation dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes glitch {
        0% {
            text-shadow: 
                0.05em 0 0 rgba(255, 0, 0, 0.75),
                -0.025em -0.05em 0 rgba(0, 255, 0, 0.75),
                0.025em 0.05em 0 rgba(0, 0, 255, 0.75);
        }
        14% {
            text-shadow: 
                0.05em 0 0 rgba(255, 0, 0, 0.75),
                -0.025em -0.05em 0 rgba(0, 255, 0, 0.75),
                0.025em 0.05em 0 rgba(0, 0, 255, 0.75);
        }
        15% {
            text-shadow: 
                -0.05em -0.025em 0 rgba(255, 0, 0, 0.75),
                0.025em 0.025em 0 rgba(0, 255, 0, 0.75),
                -0.05em -0.05em 0 rgba(0, 0, 255, 0.75);
        }
        49% {
            text-shadow: 
                -0.05em -0.025em 0 rgba(255, 0, 0, 0.75),
                0.025em 0.025em 0 rgba(0, 255, 0, 0.75),
                -0.05em -0.05em 0 rgba(0, 0, 255, 0.75);
        }
        50% {
            text-shadow: 
                0.025em 0.05em 0 rgba(255, 0, 0, 0.75),
                0.05em 0 0 rgba(0, 255, 0, 0.75),
                0 -0.05em 0 rgba(0, 0, 255, 0.75);
        }
        99% {
            text-shadow: 
                0.025em 0.05em 0 rgba(255, 0, 0, 0.75),
                0.05em 0 0 rgba(0, 255, 0, 0.75),
                0 -0.05em 0 rgba(0, 0, 255, 0.75);
        }
        100% {
            text-shadow: 
                -0.025em 0 0 rgba(255, 0, 0, 0.75),
                -0.025em -0.025em 0 rgba(0, 255, 0, 0.75),
                -0.025em -0.05em 0 rgba(0, 0, 255, 0.75);
        }
    }
`;
document.head.appendChild(style);