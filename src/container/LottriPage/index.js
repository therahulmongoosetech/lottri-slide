import React, { useLayoutEffect, useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { useWindowSize } from "react-use";
import Confetti from "react-confetti";
import { useLocation } from "react-router-dom";

const randomNumbers = (number = 9, defaultNumber) => {
  return Array(number)
    .fill()
    .map((item, index) => ({
      label:
        index === number - 1 ? defaultNumber : Math.round(Math.random() * 9),
    }));
};

// const params = `/?lottriType=${lottriType}&lottriId=${lottriId}&winingNumber=${winingNumber}`;
// const actualLink = `http://localhost:3000/?lottritype=three&lottriid=A87D876N&winingnumber=56898`;

function LottriPage() {
  const defaultNumbers = [5, 9, 8, 7];
  const parentRef = useRef();
  const tl = useRef();
  const [isWin, setIsWin] = useState(false);
  const [isLoss, setIsLoss] = useState(false);
  const [first, setFirst] = useState(randomNumbers(9, defaultNumbers[0]));
  const [second, setSecond] = useState(randomNumbers(9, defaultNumbers[1]));
  const [third, setThird] = useState(randomNumbers(9, defaultNumbers[2]));
  const [forth, setForth] = useState(randomNumbers(9, defaultNumbers[3]));
  const { width, height } = useWindowSize();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const lottriType = queryParams.get("lottritype");
  const lottriId = queryParams.get("lottriid");
  const winingNumber = queryParams.get("winingnumber");
  const winningNumberArray = winingNumber?.split("");

  const staticNumbers1 = [
    1, 4, 3, 7, 5, 6, 7, 8, 9, 3, 7, 5, 6, 7, 8, 9, 7, 5, 6, 7, 8, 9, 7, 8, 9,
    7, 5, 6,
  ];
  const indexToReplace = staticNumbers1.indexOf(3);
  if (indexToReplace !== -1 && winningNumberArray?.length > 0) {
    staticNumbers1[indexToReplace] = winningNumberArray[0];
  }
  const staticNumberSet1 = (numbers) => {
    return staticNumbers1.map((number) => ({
      label: number,
    }));
  };

  const staticNumbers2 = [
    1, 4, 3, 7, 5, 6, 7, 8, 9, 3, 7, 5, 6, 7, 8, 9, 7, 5, 6, 7, 8, 9, 7, 8, 9,
    7, 5, 6,
  ];
  const indexToReplace2 = staticNumbers2.indexOf(3);
  if (indexToReplace2 !== -1 && winningNumberArray?.length > 0) {
    staticNumbers2[indexToReplace2] = winningNumberArray[1];
  }
  const staticNumberSet2 = (numbers) => {
    return staticNumbers2.map((number) => ({
      label: number,
    }));
  };

  const staticNumbers3 = [
    1, 4, 3, 7, 5, 6, 7, 8, 9, 3, 7, 5, 6, 7, 8, 9, 7, 5, 6, 7, 8, 9, 7, 8, 9,
    7, 5, 6,
  ];
  const indexToReplace3 = staticNumbers3.indexOf(3);
  if (indexToReplace3 !== -1 && winningNumberArray?.length > 0) {
    staticNumbers3[indexToReplace3] = winningNumberArray[2];
  }
  const staticNumberSet3 = (numbers) => {
    return staticNumbers3.map((number) => ({
      label: number,
    }));
  };

  const staticNumbers4 = [
    1, 4, 3, 7, 5, 6, 7, 8, 9, 3, 7, 5, 6, 7, 8, 9, 7, 5, 6, 7, 8, 9, 7, 8, 9,
    7, 5, 6,
  ];
  const indexToReplace4 = staticNumbers4.indexOf(3);
  if (indexToReplace4 !== -1 && winningNumberArray?.length > 0) {
    staticNumbers4[indexToReplace4] = winningNumberArray[3];
  }
  const staticNumberSet4 = (numbers) => {
    return staticNumbers4.map((number) => ({
      label: number,
    }));
  };

  useLayoutEffect(() => {
    const ctx = gsap.context((self) => {
      tl.current = gsap
        .timeline({
          paused: true,
          onComplete: () => {
            if (
              (first !== winningNumberArray[0] &&
                second !== winningNumberArray[1] &&
                third !== winningNumberArray[2]) ||
              (lottriType === "four" && forth !== winningNumberArray[3])
            ) {
              setIsWin(true);
            } else {
              setIsLoss(true);
            }
            // setTimeout(() => {
            //   setIsWin(false);
            //   setIsLoss(false);
            // }, 30000);
          },
        })
        .fromTo(
          ".numbers-wrapper-1",
          {
            yPercent: -75,
            ease: "none",
          },
          {
            duration: 4,
            yPercent: -7,
          }
        )
        .fromTo(
          ".numbers-wrapper-2",
          {
            yPercent: -75,
            ease: "none",
          },
          {
            duration: 4,
            yPercent: -7,
          }
        )
        .fromTo(
          ".numbers-wrapper-3",
          {
            yPercent: -75,
            ease: "none",
          },
          {
            duration: 4,
            yPercent: -7,
          }
        )
        .fromTo(
          ".numbers-wrapper-4",
          {
            yPercent: -75,
            ease: "none",
          },
          {
            duration: 4,
            yPercent: -7,
          }
        );
    }, parentRef);
    return () => ctx.revert();
  }, []);
  const handlePlay = () => {
    setFirst(staticNumberSet1([5, 9, 8]));
    setSecond(staticNumberSet2([2, 4, 7]));
    setThird(staticNumberSet3([1, 3, 6]));
    setForth(staticNumberSet4([4, 7, 5]));
    tl.current.restart();
  };

  useEffect(() => {
    const delay = 5000;
    const timeoutId = setTimeout(() => {
      handlePlay();
    }, delay);

    // Clean up the timeout to prevent memory leaks
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div
      ref={parentRef}
      className="min-h-screen space-y-8 text-center overflow-hidden "
    >
      <div
        className="bg-cover	bg-no-repeat min-h-screen p-2.5 max-w-[500px] m-auto"
        style={{ backgroundImage: `url('./images/bg-img.png')` }}
      >
        <img src="./images/logo.png" alt="logo" className="w-60	m-auto" />
        <p className="text-sm !mt-0 text-white">
          Let's unveil the stars of today's{" "}
          <span className="text-[#ffb15f]">Winning</span>{" "}
          <strong>Combination.</strong>
        </p>
        <div className="animated-box">
          {isWin && (
            <div className="relative !mt-0 h-[150px] flex items-center justify-center heartbeat">
              <img
                src="./images/design-1.png"
                alt="design-1"
                className="w-[162px] absolute left-[calc(50%-81px)]"
              />
              <img
                src="./images/winner-text.png"
                alt="winner-text"
                className="relative z-10 w-[230px] m-auto"
              />
            </div>
          )}
        </div>

        <div className="relative !mt-0">
          <div className="flex gap-2 p-1 justify-center items-center h-32 rounded-lg relative z-10">
            <div className="w-[68px] h-[102px] overflow-hidden relative">
              <img
                src="./images/scroll-bg.png"
                alt="scroll"
                className="absolute left-0 top-0 right-0 bottom-0"
              />
              <div className="w-[68px] h-[84px] overflow-hidden relative bg-contain bg-no-repeat z-10 mt-[6px]">
                <div className="w-14 numbers-wrapper-1 absolute left-0 top-0">
                  {first.map((item, index) => (
                    <div
                      key={index}
                      className="h-12 w-14 flex items-center justify-center gap-2 text-4xl font-semibold numbers text-stroke-custom text-white"
                    >
                      {item.label}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="w-[68px] h-[102px] overflow-hidden relative">
              <img
                src="./images/scroll-bg.png"
                alt="scroll"
                className="absolute left-0 top-0 right-0 bottom-0"
              />
              <div className="w-[68px] h-[84px] overflow-hidden relative bg-contain bg-no-repeat z-10 mt-[6px]">
                <div className="w-14 numbers-wrapper-2 absolute left-0 top-0">
                  {second.map((item, index) => (
                    <div
                      key={index}
                      className="h-12 w-14 flex items-center justify-center gap-2 text-4xl font-semibold numbers text-stroke-custom text-white"
                    >
                      {item.label}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="w-[68px] h-[102px] overflow-hidden relative">
              <img
                src="./images/scroll-bg.png"
                alt="scroll"
                className="absolute left-0 top-0 right-0 bottom-0"
              />
              <div className="w-[68px] h-[84px] overflow-hidden relative bg-contain bg-no-repeat z-10 mt-[6px]">
                <div className="w-14 numbers-wrapper-3 absolute left-0 top-0">
                  {third.map((item, index) => (
                    <div
                      key={index}
                      className="h-12 w-14 flex items-center justify-center gap-2 text-4xl font-semibold numbers text-stroke-custom text-white"
                    >
                      {item.label}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {lottriType === "four" && (
              <div className="w-[68px] h-[102px] overflow-hidden relative">
                <img
                  src="./images/scroll-bg.png"
                  alt="scroll"
                  className="absolute left-0 top-0 right-0 bottom-0"
                />
                <div className="w-[68px] h-[84px] overflow-hidden relative bg-contain bg-no-repeat z-10 mt-[6px]">
                  <div className="w-14 numbers-wrapper-4 absolute left-0 top-0">
                    {forth.map((item, index) => (
                      <div
                        key={index}
                        className="h-12 w-14 flex items-center justify-center gap-2 text-4xl font-semibold numbers text-stroke-custom text-white"
                      >
                        {item.label}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {isWin && (
          <>
            <img
              src="./images/congratulation-text.png"
              alt="congratulation"
              className="w-[180px] m-auto !mt-0 heartbeat"
            />
            <div
              style={{ backgroundImage: `url('/images/price-box.png')` }}
              className="w-[300px] h-[120px] m-auto !mt-0 flex items-center justify-center bg-cover relative z-10 heartbeat"
            >
              <h1 className="text-4xl pt-[15px] pl-[15px] mt-0 tracking-[12px] font-bold shadow-text text-white z-10 relative">
                {winningNumberArray[0]} {winningNumberArray[1]}{" "}
                {winningNumberArray[2]}{" "}
                {lottriType === "four" && winningNumberArray[3]}
              </h1>
            </div>

            <Confetti width={width} height={height} duration={200} />
            <div className="absolute bottom-[-70px] w-[300px] left-[calc(50%-150px)] slideup">
              <img src="./images/design-1.png" alt="design-1" />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default LottriPage;
