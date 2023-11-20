import React, {useRef, useState, useEffect} from 'react';
import Card from '../components/Card';
import Navbar from '../components/Navbar';
import './Home.css';

const Home = () => {

	const [state, setState] = useState(0);
  const animationBoxRef = useRef(null);
  const cardOneRef = useRef(null);
  const cardTwoRef = useRef(null);
  const cardThreeRef = useRef(null);
	const upbtn = useRef(null);
	const downbtn = useRef(null);

  useEffect(() => {
    animationBoxRef.current = document.querySelector('.animation-box');
    cardOneRef.current = animationBoxRef.current.children[1];
    cardTwoRef.current = animationBoxRef.current.children[2];
    cardThreeRef.current = animationBoxRef.current.children[3];
		upbtn.current = document.querySelector('.upbtn');
		downbtn.current = document.querySelector('.downbtn');

  }, []);

  function animateForward() {
    if (state === 0) {
      cardOneRef.current.classList.add('cardOneFirstMove');
      cardTwoRef.current.classList.add('cardTwoFirstMove');
      cardThreeRef.current.classList.add('cardThreeFirstMove');
      setState(1);
    } else if (state === 1) {
			cardOneRef.current.classList.add('cardOneSecondMove');
      cardTwoRef.current.classList.add('cardTwoSecondMove');
      cardThreeRef.current.classList.add('cardThreeSecondMove');
      setState(2);
		}
  }

  function animateBack() {
    if (state === 1) {
      cardOneRef.current.classList.remove('cardOneFirstMove');
      cardTwoRef.current.classList.remove('cardTwoFirstMove');
      cardThreeRef.current.classList.remove('cardThreeFirstMove');
      setState(0);
    }
		else if (state === 2) {
      cardOneRef.current.classList.remove('cardOneSecondMove');
      cardTwoRef.current.classList.remove('cardTwoSecondMove');
      cardThreeRef.current.classList.remove('cardThreeSecondMove');
      setState(1);
    }
  }

	const floatCards = document.querySelector('.float-cards');
	const cards = document.querySelectorAll('.float-cards .card');

	function moveCards() {
		cards.forEach(card => {
			const randomX = Math.random() * (floatCards.clientWidth - card.clientWidth);
			const randomY = Math.random() * (floatCards.clientHeight - card.clientHeight);
	
			card.style.left = `${randomX}px`;
			card.style.top = `${randomY}px`;
		});
	}

	setInterval(moveCards, 5000);

  return (
    <div className="Home">
      <Navbar />
      <div className="Landing">
        <div className="animation-box">
						<div className='anitext'>Your photos,</div>
            <Card id="one"/>

            <Card id="2" />

            <Card id="3" />
				<div className="float-cards">
					<Card/>
					<Card/>
					<Card/>
				</div>
						

        </div>

				<button className='upbtn' onClick={animateBack}>^</button>
				<button className='downbtn' onClick={animateForward}>^</button>
      </div>
    </div>
  );
};

export default Home;