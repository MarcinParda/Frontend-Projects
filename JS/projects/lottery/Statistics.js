class Statistics {
    constructor() {
        this.gameResults = [];
    }
    addGameToStatistics(win, bid) {
        let gameResults = {
            win,
            bid
        }
        this.gameResults.push(gameResults);
    }
    showGameStatistics() {
        let games = this.gameResults.length;
        let wins = this.gameResults.filter(result => result.win).length;
        let losses = this.gameResults.filter(result => !result.win).length;
        // let losses = games - wins;
        return [games, wins, losses];
    }
}

const stats = new Statistics();