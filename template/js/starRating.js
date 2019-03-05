class StarRating extends HTMLElenmet {
    highlight (post){
        this.stars.forEach(function(star, i){
            star.classList.toggle('full', i <= post);
        })
    }
    
    constructor(){
        super();

        this.stars = [];

        for(let i=0; i<5; i++){
            let s = document.createElement('div');
            s.className = 'star';
            this.appendChild(s);
            this.stars.push(s);

        }

        this.highlight(4);
    }
}

window.customElements.define('x-star-rating', StarRating);