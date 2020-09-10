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

      console.log(this.cards);
    },
  },
});
