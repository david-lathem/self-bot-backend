class ProcessController {
  #processes = new Map();
  constructor() {}

  setProcess(processId, data) {
    this.#processes.set(processId, data);
  }

  getProcess(processId) {
    return this.#processes.get(processId);
  }

  getAllProcesses() {
    return [...this.#processes.values()];
  }

  deleteProcess(processId) {
    this.#processes.delete(processId);
  }
}

export default new ProcessController();
