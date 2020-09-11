new Vue({
  el: "#app",
  data: {
    ranks: ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"],
    suits: ["♥", "♦", "♠", "♣"],
    cards: [],
    suitColor: {
      "♠": "black",
      "♣": "black",
      "♦": "red",
      "♥": "red",
    },
  },
  created() {
    this.displayInitialDeck();
  },
  methods: {
    displayInitialDeck() {
      let id = 1;
      this.cards = [];

      this.suits.forEach((suit) => {
        this.ranks.forEach((rank) => {
          let card = {
            id,
            suit,
            rank,
          };
          this.cards.push(card);
          id++;
        });
      });
    },
    shuffleDeck() {
      for (let i = this.cards.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * i);
        let temp = this.cards[i];
        // Vue cannot detect when it is changed!
        // this.cards[i] = this.cards[randomIndex];
        // this.cards[randomIndex] = temp;

        Vue.set(this.cards, i, this.cards[randomIndex]);
        Vue.set(this.cards, randomIndex, temp);
      }
    },
  },
});
