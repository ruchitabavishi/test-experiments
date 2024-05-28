<template>
  <div>"Welcome to my test experiments!"</div>
  <video autoplay></video>
  <button id="get-access">Get access to camera</button>
</template>

<script>
// import TaskRunner from './services/taskRunner.ts'
export default {
  name: "App",

  async mounted() {
    //this.testWebRtcFunctions();
    var debouncedMouseMove = this.debounce(this.onMouseMove, 500);

    window.addEventListener("mousemove", debouncedMouseMove);

    // const sayHello = () => console.log("Hello World");
    // const throttledSayHello = this.throttle(sayHello, 3000);
    // setInterval(throttledSayHello, 250);
    // const runner =  TaskRunner

    // const task1 = (pass) =>{
    //   setTimeout(()=>{
    //     pass("task 1 is successfully completed.")
    //   },5000)
    // }
    // const task2 = (pass,fail ) =>{
    //   setTimeout(()=>{
    //     fail("task 2 is failed.")
    //   },10000)
    // }

    // const callback = ({data,error}) => {
    //   console.log({data,error})
    // }

    // runner.enqueue(task1, callback)
    // runner.enqueue(task2, callback)

    const t1 = () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve("task 1 completed- data generated!");
        }, 5000);
      });
    };

    const t2 = () => {
      return new Promise((resolve) => {
        resolve("task 2 completed - data genereated");
      });
    };

    const t3 = new Promise((resolve, reject) => {
      reject("task 3 failed - data not generated");
    });


    // Promise.allSettled([t1(),t2(),t3]).then(data => {
    //     console.log(data,"data.....")

    //    }).catch(err => console.log(err,"error occured!"))

    this.yourPromiseAll([t1(), t2(), t3])
      .then((data) => {
        console.log(data, "this is resolved data...");
      })
      .catch((err) => {
        console.log(err, "rejected~~");
      });
  },
  methods: {
    yourPromiseAll(promises) {
      let results = [];
      let totalResolvedPromises = 0;
      return new Promise((resolve, reject) => {
        promises.forEach((promise, index) => {
          console.log(promise, "this is promise!");
          promise
            .then((data) => {
              results[index] = data;
              totalResolvedPromises++;
              if (totalResolvedPromises == promises.length) {
                resolve(results);
              }
            })
            .catch((err) => {
              reject(err);
            });
        });
      });
    },
    throttle(func, limit) {
      let inThrottle;
      return function () {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
          func.apply(context, args);
          inThrottle = true;
          setTimeout(() => (inThrottle = false), limit);
        }
      };
    },
    debounce(func, wait) {
      let timeout;
      return function () {
        let context = this;
        let args = arguments;
        clearTimeout(timeout);

        timeout = setTimeout(function () {
          timeout = null;
          func.apply(context, args);
        }, wait);
      };
    },
    testWebRtcFunctions() {
      document
        .querySelector("#get-access")
        .addEventListener("click", async function init() {
          try {
            const stream = await navigator.mediaDevices.getUserMedia({
              audio: false,
              video: true,
            });
            console.log(stream, "this is stream!");
            const videoTracks = stream.getVideoTracks();
            const track = videoTracks[0];
            alert(`Getting video from: ${track.label}`);
            document.querySelector("video").srcObject = stream;
            document.querySelector("#get-access").setAttribute("hidden", true);
            // setTimeout(() => { track.stop() }, 3 * 1000)
          } catch (error) {
            alert(`${error.name}`);
            console.error(error);
          }
        });
    },

    onMouseMove(e) {
      console.log("hello", e.x, e.y);
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
