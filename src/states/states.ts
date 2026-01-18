class Hero {
    name: string
    heroClass: string
    
    constructor(name:string, heroClass: string){
        this.name = name,
        this.heroClass = heroClass
    }
}

class HeroStates {
    hero: Hero
    constructor(hero: Hero){
        this.hero = hero
    }
}