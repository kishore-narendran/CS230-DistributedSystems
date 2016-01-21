var jsonfile = require('jsonfile');

function getAverageWaitTime(numberOfProcessors, numberOfMemory, numberOfCycles) {
  var waitTime = [];
  var waitingOn = [];
  for(var i = 0; i < numberOfProcessors; i++) {
    waitTime[i] = 0;
    waitingOn[i] = -1;
  }
  var waitQueue = [];
  var engaged = [];
  for(var i = 0; i < numberOfMemory; i++) {
    waitQueue[i] = [];
    engaged[i] = false;
  }
  for(var i = 0; i < numberOfCycles; i++) {
    //console.log("*****************************");
    //console.log('  Beginning of cycle ' + i);
    for(var j = 0; j < numberOfProcessors; j++) {
      if(waitingOn[j] == -1) {
        var memory = getRandomMemory(numberOfMemory);
        //console.log('Memory ' + j + ' has requested memory ' + memory);
        waitQueue[memory].push(j);
        waitingOn[j] = memory;
      }
      else {
        //console.log('Memory ' + j + ' is waiting for memory ' + waitingOn[j]);
      }

      /*
      console.log("Wait Time " + waitTime);
      console.log("Waiting On " + waitingOn);
      console.log("Wait Queues ");
      console.log(waitQueue);
      console.log("\n\n")
      */

    }

    for(var j = 0; j < numberOfMemory; j++) {
      wq = waitQueue[j];
      waitingOn[wq[0]] = -1;
      for (var k = 1; k < wq.length; k++) {
        waitTime[wq[k]]++;
      }
      waitQueue[j].splice(0,1);

      /*
      console.log("Checking Memory Attributes!");
      console.log("Wait Time " + waitTime);
      console.log("Waiting On " + waitingOn);
      console.log("Wait Queues ");
      console.log(waitQueue);
      console.log("Engaged " + engaged);
      console.log("\n\n")
      */
    }
  }

  var sum = 0;
  for(i = 0; i < numberOfProcessors; i++) {
    sum = sum + waitTime[i];
  }
  return sum/(numberOfCycles*numberOfProcessors);
}

function getRandomMemory(numberOfMemory) {
  return Math.floor(Math.random() * (numberOfMemory));
}

var processors = 300;
var cycles = 1000;
memorySizes = [1];
for(var j = 10; j <= 10000; j*=10) {
  for(var i = 2*j; i <= j*10; i+=j) {
    memorySizes.push(i);
  }
}
var waitTimes = [];
for(var i = 0; i < memorySizes.length; i++) {
  waitTimes.push(getAverageWaitTime(processors, memorySizes[i], cycles));
}

jsonfile.writeFileSync('output-300_100000.json', {'average_wait_times': waitTimes, 'processors': processors, 'memory': memorySizes, 'cycles': cycles});
console.log(JSON.stringify({'average_wait_times': waitTimes, 'processors': processors, 'memory': memorySizes, 'cycles': cycles}));
