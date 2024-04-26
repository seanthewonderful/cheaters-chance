import {useState, useEffect} from 'react'
import DiceBox from "@3d-dice/dice-box";
import { DisplayResults, AdvancedRoller, BoxControls } from '@3d-dice/dice-ui'


const Dice = ({turn}) => {
  const [allDice, setAllDice] = useState({'1': 0, '2': 0, '3': 0, '4': 0,'5': 0, '6': 0})
  const [showRoller, setShowRoller] = useState(true)

  useEffect(() => {
    console.log(allDice)
  }, [allDice])

  let Box;

  useEffect(() => {
      Box = new DiceBox("#page", {
          assetPath: "assets/",
          origin: "https://unpkg.com/@3d-dice/dice-box@1.0.8/dist/",
          theme: "default",
          themeColor: "#feea03",
          offscreen: true,
          scale: 10
      });

      Box.init()
        .then(() => {
          const Roller = new AdvancedRoller({
            target: '#dice-box',
            onSubmit: (notation) => Box.roll(notation),
            onClear: () => {
              Box.clear()
              Display.clear()
            },
            onReroll: (rolls) => {
              // loop through parsed roll notations and send them to the Box
              rolls.forEach(roll => Box.add(roll))
            },
            onResults: (results) => {
              Display.showResults(results)
            }
          })
        })
  }, [])



    const colors = [
      "#348888",
      "#22BABB",
      "#9EF8EE",
      "#FA7F08",
      "#F24405",
      "#F25EB0",
      "#B9BF04",
      "#F2B705",
      "#F27405",
      "#F23005"
    ];





    function get_random(list) {
      return list[Math.floor(Math.random() * list.length)];
    }

    const rollDice = () => {
      Box.roll(["5d6"], {
        themeColor: get_random(colors)
      }).then(res => {
        const allCopy = {...allDice}

        res.forEach((die) => {
          allCopy[die.value]++
        })



        setAllDice(allCopy)
        setShowRoller(false)
        // Box = undefined
      });

    }



  return (
    <div>
      {showRoller && <button onClick={rollDice}>Dice</button>}
      <section id='page'></section>
    </div>
  )
}

export default Dice