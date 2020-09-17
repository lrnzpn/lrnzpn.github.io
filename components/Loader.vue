<template>
    <div class="loader-container">
        <div class="spinner">
            <svg
                className="spinner inner"
                width="65px"
                height="65px"
                viewBox="0 0 66 66"
                xmlns="http://www.w3.org/2000/svg"
                >
                <circle
                    className="path inner"
                    fill="none"
                    strokeWidth="6"
                    strokeLinecap="round"
                    cx="33"
                    cy="33"
                    r="30"
                />
            </svg>

             <svg
                className="spinner outer"
                width="100px"
                height="100px"
                viewBox="0 0 66 66"
                xmlns="http://www.w3.org/2000/svg"
            >
            <circle
                className="path outer"
                fill="none"
                strokeWidth="6"
                strokeLinecap="round"
                cx="33"
                cy="33"
                r="30"
                />
            </svg>
        </div>
    </div>

</template>

<style lang="scss" scoped>
.loader-container {
  display: block;
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: $main-white;
  z-index: 99;

  .spinner {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    height: 100%;
    overflow: hidden;
  }
}

.outer {
  position: absolute;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;

  div {
    animation-name: scaleOut;
    animation-duration: 1s;
  }
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

@keyframes scaleOut {
  0% {
    transform: scale(1);
  }

  100% {
    transform: scale(0);
  }
}

$offset: 187;
$duration1: 1.4s;
$duration2: 2.1s;

.spinner.inner {
  animation: rotator $duration1 linear infinite;
}

.spinner.outer {
  animation: rotator $duration2 linear infinite;
}

@keyframes rotator {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(270deg);
  }
}

@keyframes rotatorInverse {
  0% {
    transform: rotate(270deg);
  }

  100% {
    transform: rotate(0deg);
  }
}

.path.inner {
  stroke-dasharray: $offset;
  stroke-dashoffset: 0;
  transform-origin: center;
  animation: dash1 $duration1 ease-in-out infinite,
    colors1 ($duration1 * 4) ease-in-out infinite;
}

.path.outer {
  stroke-dasharray: $offset;
  stroke-dashoffset: 0;
  transform-origin: center;
  animation: dash1 $duration2 ease-in-out infinite,
    colors2 ($duration2 * 4) ease-in-out infinite;
}

@keyframes colors1 {
  0% {
    stroke: white
  }

  20% {
    stroke: red
  }

  40% {
    stroke: black
  }

  60% {
    stroke: black
  }

  80% {
    stroke: red
  }

  100% {
    stroke: white
  }
}

@keyframes colors2 {
  0% {
    stroke: white
  }

  20% {
    stroke: red
  }

  40% {
    stroke: black
  }

  60% {
    stroke: black
  }

  80% {
    stroke: red
  }

  100% {
    stroke: white
  }
}

@keyframes dash1 {
  0% {
    stroke-dashoffset: $offset;
  }

  50% {
    stroke-dashoffset: $offset/4;
    transform: rotate(135deg);
  }

  100% {
    stroke-dashoffset: $offset;
    transform: rotate(450deg);
  }
}

@keyframes dash2 {
  0% {
    stroke-dashoffset: $offset;
    transform: rotate(450deg);
  }

  50% {
    stroke-dashoffset: $offset/4;
    transform: rotate(135deg);
  }

  100% {
    stroke-dashoffset: $offset;
  }
}
</style>