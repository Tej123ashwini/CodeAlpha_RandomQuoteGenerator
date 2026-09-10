/**
 * Random Quote Generator
 * CodeAlpha App Development Internship
 * 
 * Features:
 * - 35+ inspirational quotes stored directly in JavaScript
 * - Random quote selection without consecutive duplicates
 * - Smooth transition animation when changing quotes
 * - Clipboard copy functionality with visual feedback & fallback
 * - Clean, accessible, and responsive vanilla JavaScript implementation
 */

// =============================================================================
// 1. Quote Data Collection (35 Motivational & Inspirational Quotes)
// =============================================================================
const quotes = [
  {
    text: "The greatest glory in living lies not in never falling, but in rising every time we fall.",
    author: "Nelson Mandela"
  },
  {
    text: "The way to get started is to quit talking and begin doing.",
    author: "Walt Disney"
  },
  {
    text: "Your time is limited, so don't waste it living someone else's life.",
    author: "Steve Jobs"
  },
  {
    text: "If life were predictable it would cease to be life, and be without flavor.",
    author: "Eleanor Roosevelt"
  },
  {
    text: "If you look at what you have in life, you'll always have more.",
    author: "Oprah Winfrey"
  },
  {
    text: "If you set your goals ridiculously high and it's a failure, you will fail above everyone else's success.",
    author: "James Cameron"
  },
  {
    text: "Life is what happens when you're busy making other plans.",
    author: "John Lennon"
  },
  {
    text: "Spread love everywhere you go. Let no one ever come to you without leaving happier.",
    author: "Mother Teresa"
  },
  {
    text: "When you reach the end of your rope, tie a knot in it and hang on.",
    author: "Franklin D. Roosevelt"
  },
  {
    text: "Always remember that you are absolutely unique. Just like everyone else.",
    author: "Margaret Mead"
  },
  {
    text: "Don't judge each day by the harvest you reap but by the seeds that you plant.",
    author: "Robert Louis Stevenson"
  },
  {
    text: "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt"
  },
  {
    text: "Tell me and I forget. Teach me and I remember. Involve me and I learn.",
    author: "Benjamin Franklin"
  },
  {
    text: "The best and most beautiful things in the world cannot be seen or even touched — they must be felt with the heart.",
    author: "Helen Keller"
  },
  {
    text: "It is during our darkest moments that we must focus to see the light.",
    author: "Aristotle"
  },
  {
    text: "Whoever is happy will make others happy too.",
    author: "Anne Frank"
  },
  {
    text: "Do not go where the path may lead, go instead where there is no path and leave a trail.",
    author: "Ralph Waldo Emerson"
  },
  {
    text: "In the middle of every difficulty lies opportunity.",
    author: "Albert Einstein"
  },
  {
    text: "You will face many defeats in life, but never let yourself be defeated.",
    author: "Maya Angelou"
  },
  {
    text: "The only impossible journey is the one you never begin.",
    author: "Tony Robbins"
  },
  {
    text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    author: "Winston Churchill"
  },
  {
    text: "It does not matter how slowly you go as long as you do not stop.",
    author: "Confucius"
  },
  {
    text: "Everything you've ever wanted is on the other side of fear.",
    author: "George Addair"
  },
  {
    text: "Success usually comes to those who are too busy to be looking for it.",
    author: "Henry David Thoreau"
  },
  {
    text: "The only limit to our realization of tomorrow will be our doubts of today.",
    author: "Franklin D. Roosevelt"
  },
  {
    text: "Do what you can, with what you have, where you are.",
    author: "Theodore Roosevelt"
  },
  {
    text: "Happiness is not something readymade. It comes from your own actions.",
    author: "Dalai Lama"
  },
  {
    text: "Believe you can and you're halfway there.",
    author: "Theodore Roosevelt"
  },
  {
    text: "Act as if what you do makes a difference. It does.",
    author: "William James"
  },
  {
    text: "We must accept finite disappointment, but never lose infinite hope.",
    author: "Martin Luther King Jr."
  },
  {
    text: "Be yourself; everyone else is already taken.",
    author: "Oscar Wilde"
  },
  {
    text: "You must be the change you wish to see in the world.",
    author: "Mahatma Gandhi"
  },
  {
    text: "Darkness cannot drive out darkness: only light can do that. Hate cannot drive out hate: only love can do that.",
    author: "Martin Luther King Jr."
  },
  {
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs"
  },
  {
    text: "In three words I can sum up everything I've learned about life: it goes on.",
    author: "Robert Frost"
  }
];

// =============================================================================
// 2. DOM Elements & State
// =============================================================================
const quoteContent = document.getElementById("quote-content");
const quoteText = document.getElementById("quote-text");
const quoteAuthor = document.getElementById("quote-author");
const newQuoteBtn = document.getElementById("new-quote-btn");
const copyBtn = document.getElementById("copy-btn");
const copyBtnText = document.getElementById("copy-btn-text");
const copyIcon = document.getElementById("copy-icon");

// Tracks current quote index to prevent identical consecutive quotes
let currentQuoteIndex = -1;
let copyTimeoutId = null;
let isAnimating = false;

// SVG Icons for Copy button states
const ICON_CLIPBOARD = `
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
  </svg>
`;

const ICON_CHECKMARK = `
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
`;

// =============================================================================
// 3. Core Functions
// =============================================================================

/**
 * Returns a random quote index distinct from the current one.
 * Ensures that clicking 'New Quote' never repeats the same quote twice in a row.
 */
function getRandomQuoteIndex() {
  if (quotes.length <= 1) return 0;

  let randomIndex;
  do {
    randomIndex = Math.floor(Math.random() * quotes.length);
  } while (randomIndex === currentQuoteIndex);

  return randomIndex;
}

/**
 * Displays a new random quote with smooth fade transition.
 * Used when the user clicks 'New Quote' or presses a shortcut key.
 */
function displayNewQuote() {
  if (isAnimating) return; // Prevent rapid clicking glitches
  isAnimating = true;

  const nextIndex = getRandomQuoteIndex();
  const selectedQuote = quotes[nextIndex];

  // Add fade-out transition
  quoteContent.classList.remove("fade-in");
  quoteContent.classList.add("fade-out");

  // After fade-out completes, update state, DOM text, and fade back in
  setTimeout(() => {
    currentQuoteIndex = nextIndex;
    quoteText.textContent = `"${selectedQuote.text}"`;
    quoteAuthor.textContent = selectedQuote.author;

    quoteContent.classList.remove("fade-out");
    quoteContent.classList.add("fade-in");

    isAnimating = false;
  }, 200);
}

/**
 * Initializes the quote card immediately without fade delay on initial page load.
 */
function initializeQuote() {
  const initialIndex = getRandomQuoteIndex();
  const initialQuote = quotes[initialIndex];
  currentQuoteIndex = initialIndex;

  quoteText.textContent = `"${initialQuote.text}"`;
  quoteAuthor.textContent = initialQuote.author;
  quoteContent.classList.add("fade-in");
}

/**
 * Copies the current quote and author to the clipboard with fallback support.
 */
async function copyQuoteToClipboard() {
  if (currentQuoteIndex < 0 || currentQuoteIndex >= quotes.length) return;

  const currentQuote = quotes[currentQuoteIndex];
  const textToCopy = `"${currentQuote.text}" — ${currentQuote.author}`;

  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(textToCopy);
      showCopiedFeedback();
    } else {
      fallbackCopyText(textToCopy);
      showCopiedFeedback();
    }
  } catch (err) {
    // If modern clipboard write failed, attempt fallback method
    try {
      fallbackCopyText(textToCopy);
      showCopiedFeedback();
    } catch (fallbackErr) {
      console.error("Failed to copy quote: ", fallbackErr);
    }
  }
}

/**
 * Fallback clipboard copy using a temporary textarea element.
 */
function fallbackCopyText(text) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  // Keep off-screen and invisible
  textArea.style.position = "fixed";
  textArea.style.top = "-9999px";
  textArea.style.left = "-9999px";
  textArea.setAttribute("aria-hidden", "true");
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  const successful = document.execCommand("copy");
  document.body.removeChild(textArea);
  if (!successful) {
    throw new Error("execCommand copy was unsuccessful");
  }
}

/**
 * Provides temporary visual feedback when a quote is successfully copied.
 */
function showCopiedFeedback() {
  // Clear any existing reset timeout
  if (copyTimeoutId) {
    clearTimeout(copyTimeoutId);
  }

  // Update button UI to "Copied!" state
  copyBtn.classList.add("copied");
  copyIcon.innerHTML = ICON_CHECKMARK;
  copyBtnText.textContent = "Copied!";
  copyBtn.setAttribute("aria-label", "Quote copied to clipboard");

  // Reset button state after 2 seconds
  copyTimeoutId = setTimeout(() => {
    copyBtn.classList.remove("copied");
    copyIcon.innerHTML = ICON_CLIPBOARD;
    copyBtnText.textContent = "Copy Quote";
    copyBtn.setAttribute("aria-label", "Copy quote to clipboard");
    copyTimeoutId = null;
  }, 2000);
}

// =============================================================================
// 4. Event Listeners & Initialization
// =============================================================================

// Button Clicks
newQuoteBtn.addEventListener("click", displayNewQuote);
copyBtn.addEventListener("click", copyQuoteToClipboard);

// Keyboard Accessibility: Press 'Spacebar' or 'N' to generate a new quote
document.addEventListener("keydown", (event) => {
  // Ignore if user is currently focused on an input or textarea
  if (event.target.tagName === "INPUT" || event.target.tagName === "TEXTAREA") return;

  if (event.code === "Space" && event.target !== newQuoteBtn && event.target !== copyBtn) {
    event.preventDefault();
    displayNewQuote();
  } else if (event.key === "n" || event.key === "N") {
    displayNewQuote();
  }
});

// Initialize first quote immediately when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeQuote);
} else {
  initializeQuote();
}
