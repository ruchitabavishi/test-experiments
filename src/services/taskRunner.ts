class TaskRunner {
    // few data 
    tasks = [];
    isThreadFree = true
  
    enqueue(task, cb) {
      this.tasks.push({
        task: task,
        callBack: cb
      })
      this.checkIfTaskCanbeRun();
    }
  
    checkIfTaskCanbeRun() {
      if(this.isThreadFree && this.tasks.length !=0) {
        const taskToRun = this.tasks[0]
        this.tasks = this.tasks.splice(1)
        this.runTask(taskToRun)
      } else {
        console.warn("wait for thread to get free")
      }
    }
  
    runTask(taskToRun) {
    this.isThreadFree = false
    const p = new Promise(taskToRun.task)
    
      p.then(data => {
       taskToRun.callBack({data})
      }
      ).catch(error => {
        taskToRun.callBack({error})
       
      }).finally(() => {
        this.isThreadFree = true
        this.checkIfTaskCanbeRun()
      })
    }
  }

  export default new TaskRunner();




  