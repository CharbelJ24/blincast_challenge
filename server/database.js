export class DatabaseMemory {
    #data = new Map()

    list() {
        return Array.from(this.#data.entries()).map(([key, value]) => {
            return { key, value }
        })
    }

    create(key, value) {
        //  key ja existe
        if(this.#data.has(key)){
            return { status: 'error', code: 6 }
        }
        
        // key nao existe 
        this.#data.set(key, value)
        return { status: 'ok', code: 0 }
    }

    update(key, value) {
        // key nao existe
        if (!this.#data.has(key)) {
            return { status: 'error', code: -1}
        }

        // key existe
        this.#data.set(key, value)
        return { status: 'ok', code: 0 }
    }

    delete(key) {
        // key nao existe
        if (!this.#data.has(key)) {
            return { status: 'error', code: -1}
        }

        this.#data.delete(key)
        return { status: 'ok', code: 0 }
    }
}