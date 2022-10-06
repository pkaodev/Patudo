import React from "react";

export default function HowToPlay() {
  return (
    <div className="padding-sides-s how-to-play">
      <p>
        <br />
        {`Patudo is a variant of `}
        <a
          href="https://en.wikipedia.org/wiki/Liar%27s_dice"
          target="_blank"
          rel="noopener noreferrer"
        >
          Liar's Dice
        </a>
      </p>
      <br />
      <p>
        Each player starts with 5 dice in a cup. The goal is to be the last
        player with dice in the cup.
        <br />
        <br />
        At the start of a round everyone rolls their dice. You are allowed to
        only see your own dice.
        <br />
        <br />
        At the start of the round the first player has to place a bet. You are
        bettiing on the number of dice (under all the cups!) that have a certain
        number on them (face value).
        <br />
        <br />
        For example, betting "Two 3's" means that you are betting that there are{" "}
        <u>AT LEAST</u> two dice with a 3 on them.
        <br />
        <br />
        The player then has two options; placing another (higher) bet or calling
        the previous bet a lie (BS).
        <br />
        <br />
        If the player calls BS, then everyone reveals their dice to each other
        and the bet is checked. In this case the number of dice with a value of
        3 is counted. If there are two or more dice with a value of 3, the bet
        was valid, and the player who called BS loses a dice. If there were
        fewer than two dice with a value of 3, the bet was invalid, and the
        player who made the bet loses a dice. The next round the starts with the
        player who lost a dice starting.
        <br />
        <br />
        If the second player wishes to place another bet instead of call BS, the
        bet must be of a higher value. This means that the new bet must EITHER
        have the same number of dice but with a higher face value, OR it can be
        a higher number of dice with any face value.
        <br />
        <br />
        For example if the first player bets "Two 3's", the second player can
        bet "Two 4's", "Two 5's", "Two 6's", or "Three/Four/Five.... of any
        value". The second player cannot bet "Two 2's" or "One 6", for example.
        <br />
        <br />
        Cabbages:
        <br />
        At any time after the first bet is made, a player who has not just made
        a bet or who's turn it is to call BS, may call "Cabbages". If this
        happens all players reveal their dice. If there are <u>EXACTLY</u> the
        number of dice that were bet on, the player who called cabbages{" "}
        <u>GAINS</u> a dice. If the the number was not exact, the player who
        called cabbages loses a dice. The next round starts with the player who
        called cabbages.
        <br />
        <br />
        Pacifico:
        <br />
        When a player loses a dice and only has one dice remaining, the next
        round is a "Pacifico" round. During this round every bet made has to use
        the face value of the first bet made that round. For example, if the
        starting player bets "One 6", the next player could only bet "Two 6's",
        "Three 6's" etc. After this round the pacifico rule is removed and the
        game continues as normal (unless another player goes down to one dice
        during that round).
        <br />
        <br />
        NOTE:
        <br />
        Whilst trying to peek at other players dice is not allowed and frowned
        upon, sarcasm and competetive banter is encouraged.
        <br />
        <br />
        NOTE NOTE:
        <br />
        If you have played another variant of Liar's Dice, you may notice that
        the rules are slightly different. The main differences between Patudo
        and 'the other popular variant' are:
        <ul className="rules-list">
          <li>Dice with face value of one aren't special</li>
          <li>
            Pacifico can happen multiple times for each player, whenever they go
            down to one dice
          </li>
          <li>
            The singular and plural of dice is dice. Die just reads weirdly.
          </li>
        </ul>
        <br />
      </p>
    </div>
  );
}
