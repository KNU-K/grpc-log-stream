module.exports = class ClientConnection extends Array {
    constructor(maxConnections) {
        super();
        this.maxConnections = maxConnections;
    }

    addConnection(connection) {
        if (this.length < this.maxConnections) {
            this.push(connection);
            return true; // 연결 성공
        } else {
            console.log("Maximum connections reached.");
            return false; // 연결 실패
        }
    }

    removeConnection(connection) {
        const index = this.indexOf(connection);
        if (index !== -1) {
            this.splice(index, 1); // 연결 해제
            return true;
        }
        return false; // 연결을 찾을 수 없음
    }

    // Iterator를 구현하여 for...of 루프에서 사용 가능하게 함
    [Symbol.iterator]() {
        let index = 0;
        let data = this; // 배열 자체가 this에 저장됨

        return {
            next: () => {
                if (index < data.length) {
                    return { value: data[index++], done: false };
                } else {
                    return { done: true };
                }
            },
        };
    }
};
