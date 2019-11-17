function Coachmark() {
  let steps = null;
  let tooltip = null;
  let nextBtn = null;
  let skipBtn = null;
  let currentStep = 0;
  let highlighter = null;

  const overlayStyles = ` 
    top: 0; 
    left: 0;
    right: 0;
    bottom: 0;
    position: fixed;
    background-color: rgb(0,0,0, 0.5);
  `;

  const interfaceStyles = `
      position: absolute;
      z-index: 999;
      transition: all 0.4s ease;
      background-color: transparent;
    `;

  const highlightedElementStyles = `
    position: relative;
    z-index: 9999;
  `;

  const tooltipStyles = `
    padding: 1em;
    display: flex;
    z-index: 9999999;
    margin-top: 1rem;
    position: absolute;
    flex-direction: column;
    transition: all 0.4s ease;
    background-color: #ffffff;
  `;
  const tooltipPseudoStyle = `
    top: -8px;
    content: '';
    width: 15px;
    height: 15px;
    position: absolute;
    background-color: #fff;
    transform: rotate(45deg);
  `;

  const buttons = `
    display: flex;
    padding-top: 1rem;
    align-items: center;
    justify-content: space-between;
  `;

  const btnStyle = `
    padding: 0.5rem;
    font-size: 0.9rem;
    border-radius: 5px;
    appearance: none;
    -moz-appearance: none;
  `;

  function init() {
    steps = document.querySelectorAll("*[data-coachmark]");
    const coachmarkElements = getCoachmarkElements();
    document.body.insertAdjacentHTML("beforeend", coachmarkElements);

    highlighter = document.getElementById("js-coachmark-interface");
    tooltip = document.getElementById("js-coachmark-tooltip");
    skipBtn = document.querySelector(".coachmark-skip");
    nextBtn = document.querySelector(".coachmark-next");

    // Add styles for coachmark overlay
    addStyles(".coachmark-overlay", overlayStyles);
    addStyles(".coachmark-tooltip", tooltipStyles);
    addStyles(".coachmark-interface", interfaceStyles);
    addStyles(".coachmark-tooltip .coachmark-btns", buttons);
    addStyles(".coachmark-tooltip:before", tooltipPseudoStyle);
    addStyles(".coachmark-highlight", highlightedElementStyles);
    addStyles(".coachmark-tooltip .coachmark-btns .__btn", btnStyle);

    highlightElement(steps[currentStep]);
    skipBtn.addEventListener("click", handleSkipClick);
  }

  function highlightElement(element) {
    if (!element)
      throw new Error(
        `To start using Coachmark plugin, please add data-coachmark attribute.`
      );

    const { top, left } = element.getBoundingClientRect();
    const height = element.offsetHeight,
      width = element.offsetWidth;

    const backgroundColor = getBgColor(element);

    /**
     * getBoundingClientRect returns the element's position
     * relative to the viewport, not from the body. So it does
     * NOT account for scrollPosition.
     */
    const yScrollPosition = window.pageYOffset;
    const xScrollPosition = window.pageXOffset;

    if (highlighter) {
      highlighter.style["background-color"] = backgroundColor;
      highlighter.style.top = top + yScrollPosition;
      highlighter.style.left = left + xScrollPosition;
      highlighter.style.width = width;
      highlighter.style.height = height;
    }

    addTooltip({
      top: top + yScrollPosition,
      left: left + xScrollPosition,
      height
    });

    // Add class to the element
    element.classList.add("coachmark-highlight");

    // Scroll element's parent container so that it is visible
    setTimeout(() => { // Chrome hack for scrollIntoView
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 0)

    if (currentStep === steps.length - 1) {
      nextBtn.style.display = "none";
    } else {
      nextBtn.style.display = "inline-block";
      nextBtn.addEventListener("click", handleNextBtnClick);
    }
  }

  function removeHighlight(element) {
    if (element) {
      element.classList.remove("coachmark-highlight");
    }
  }

  function addTooltip({ top, left, height }) {
    tooltip.style.top = `${Number.parseInt(top, 10) +
      Number.parseInt(height, 10)}px`;
    tooltip.style.left = left;
  }

  function handleSkipClick() {
    destroy();
  }

  function handleNextBtnClick() {
    if (currentStep < steps.length - 1) {
      removeHighlight(steps[currentStep]);
      currentStep++;
      highlightElement(steps[currentStep]);
    }
  }

  function destroy() {
    removeHighlight(steps[currentStep]);
    const mountPoint = document.getElementById("js-coachmark");
    if (mountPoint) mountPoint.remove();
    if (nextBtn) nextBtn.removeEventListener("click", handleNextBtnClick);
    if (skipBtn) skipBtn.removeEventListener("click", handleSkipClick);
  }

  function getCoachmarkElements() {
    return `
						<section id="js-coachmark">
            <section id="js-coachmark-overlay" class="coachmark-overlay"></section>
            <section id="js-coachmark-interface" class="coachmark-interface"></section>
							<section id="js-coachmark-tooltip" class="coachmark-tooltip">
								<header>This is the intro text</header>
								<article class="coachmark-btns">
									<button class="coachmark-skip __btn">Skip</button>
									<button class="coachmark-next __btn">Next</button>
								</article>
							</section>
						</section>
        `;
  }

  function addStyles(selector, styles) {
    if (styles.length) {
      const style = document.createElement("style");
      document.head.appendChild(style);
      const styleSheet = style.sheet;
      styleSheet.insertRule(
        `${selector} { ${styles} }`,
        styleSheet.cssRules.length
      );
    }
  }

  function getBgColor(element) {
    let backgroundColor = window
      .getComputedStyle(element)
      .getPropertyValue("background-color");
    while (
      backgroundColor === "rgba(0, 0, 0, 0)" &&
      element !== document.body
    ) {
      element = element.parentNode;
      backgroundColor = window
        .getComputedStyle(element)
        .getPropertyValue("background-color");
    }
    return backgroundColor;
  }

  return {
    init: init,
    destroy: destroy
  };
}

export default Coachmark;
