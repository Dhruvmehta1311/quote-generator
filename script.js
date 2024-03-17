const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote')
const authorText = document.getElementById('author')
const twiterBtn = document.getElementById('twitter')
const newQuoteBtn = document.getElementById('new-quote')



let apiQuotes = [];

// Show new quote
function newQuote(){
    console.log(apiQuotes);
    // Pick a random quote from API
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)]

    // For Local Quote
    // const quote = localQuotes[Math.floor(Math.random() * localQuotes.length)]

    // console.log(quote);

    // const author = quote.author.split(',')[0].trim();

    // Check if Author Field is Black or not.

    if(!quote.author || quote.author == 'type.fit'){
        authorText.textContent = "Unknown"
    }else{
        const authorSplit = quote.author.split(',')[0]
        authorText.textContent = authorSplit
    }

    // Check Quote Length for Styling
    if(quote.text.length > 130){
        quoteText.classList.add('long-quote')
    } else{
        quoteText.classList.remove('long-quote')
    }
    quoteText.textContent = quote.text
}


// Get Quotes from API
async function getQuotes(){
    const apiUrl = 'https://type.fit/api/quotes';
    try{
        const response = await fetch(apiUrl)
        apiQuotes = await response.json();
        // getQuotes();
        newQuote();
    }
    catch(error){
        console.log("There's an Error", error);
    }
}

// Tweet Quuote
function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank')
}

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote)
twiterBtn.addEventListener('click', tweetQuote)


// On Load
getQuotes();

// newQuote();