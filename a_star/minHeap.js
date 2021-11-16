class MinHeap{
    constructor(){
        this.data = [];
    }

    getLength(){
        return this.data.length;
    }

    getData(){
        return this.data;
    }

    includeCell(cell){
        this.data.forEach(curCell =>{
            if(curCell == cell) return true;
        })
        return false;
    }

    insert(item){
        this.data.push(item);
        this.bubbleUp();
    }

    extract(){
        if(this.data.length == 0) throw "Heap empty."

        let minValue = this.data[0];
        if(this.data.length == 1){
            this.data.pop();
            return minValue;
        }
        this.data[0] = this.data.pop();
        this.bubbleDown();
        return minValue;
    }

    bubbleUp(){
        let itemIdx = this.data.length-1;
        while(itemIdx > 0){
            let parentIdx = Math.floor((itemIdx-1)/2);          
            if(this.data[itemIdx].f < this.data[parentIdx].f){
                let temp = this.data[itemIdx];
                this.data[itemIdx] = this.data[parentIdx];
                this.data[parentIdx] = temp;
            }
            itemIdx = parentIdx;
        }
    }

    bubbleDown(){
        let itemIdx = 0;
        let size = this.data.length;

        while(true){
            let rightChildIdx = (itemIdx + 1) * 2;
            let leftChildIdx = rightChildIdx - 1;
            let swapIdx;

            if(leftChildIdx >= size) break;
            else if(rightChildIdx >= size) swapIdx = leftChildIdx;
            else{
                swapIdx = this.data[rightChildIdx].f > this.data[leftChildIdx].f ? leftChildIdx : rightChildIdx;
            }

            if(this.data[itemIdx].f > this.data[swapIdx].f){
                let temp = this.data[itemIdx];
                this.data[itemIdx] = this.data[swapIdx];
                this.data[swapIdx] = temp;

                itemIdx = swapIdx;
            }else{
                break;
            }
        }
    }
}