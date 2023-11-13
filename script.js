const API_KEY="0a29ee8750914158b58eab4c105e792e"
const url="https://newsapi.org/v2/everything?q="
window.addEventListener("load",()=>fetchNews("India"));
function reload(){
    window.location.reload();
}
async function fetchNews(query){
    const res=await fetch(`${url}${query}&apiKey=${API_KEY}`);  
    const data=await res.json();
    console.log(data)
    bindData(data.articles.slice(0,15));
}
function bindData(articles){
    const cardsContainer=document.getElementById('cards-container');
    const newCardTemplate=document.getElementById('template-news-card');
    cardsContainer.innerHTML='';
    articles.forEach(article=>{
        if(!article.urlToImage) return;
        const cardClone=newCardTemplate.content.cloneNode(true);
        fillDataInCard(article,cardClone);
        cardsContainer.appendChild(cardClone);
    })
}
function fillDataInCard(article,cardClone){
    const newsImg=cardClone.querySelector('#news-img')
    const newsTitle=cardClone.querySelector('#news-title')
    const newsSource=cardClone.querySelector('#news-source')
    const newsDesc=cardClone.querySelector('#news-desc');
    newsImg.src=article.urlToImage;
    newsTitle.innerHTML=article.title;
    newsDesc.innerHTML=article.description;
    const date=new Date(article.publishedAt).toLocaleString("en-US",{
        timeZone:"Asia/Jakarta"
    })
    newsSource.innerHTML=`${article.source.name}.${date}`;
    
    cardClone.firstElementChild.addEventListener("click",()=>{
        window.open(article.url,"_blank")
    });
}
let currentSelectednav=null;
function onNavItemClick(id){
    fetchNews(id);
    const navItem=document.getElementById(id);
    currentSelectednav?.classList.remove("active")
    currentSelectednav=navItem
    currentSelectednav.classList.add("active")
}
const searchButton=document.getElementById('search-button');
const searchInput=document.getElementById('news-input')
searchButton.addEventListener("click",()=>{
    if(!searchInput.value) return;
    fetchNews(searchInput.value)
    currentSelectednav?.classList.remove('active')
    currentSelectednav=null
})