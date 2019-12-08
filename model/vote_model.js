const Vote = require('./schema/vote');

class VoteModel {
    // 새 선거 생성
    create(vote) {
        return new Promise(async (resolve, reject) => {
            const v = new Vote(vote);
            try {
                await v.save();
                resolve("선거 생성 성공");
            } catch (err) {
                console.log(`선거 생성 오류: ${err}`);
                reject("선거 생성 실패");
            }
        });
    }

    // 선거 조회
    select(id) {
        return new Promise(async (resolve, reject) => {
            try {
                const result = await Vote.findById(id);
                resolve(result);
            } catch(err) {
                console.log(`선거 조회 오류: ${err}`);
                reject("선거 조회 실패");
            }
        });
    }

    // 선거 목록 조회
    selectAll() {
        return new Promise(async (resolve, reject) => {
            try {
                const result = await Vote.find({ status: { $gt: 0} });
                resolve(result);
            } catch(err) {
                console.log(`선거 목록 조회 오류: ${err}`);
                reject("선거 목록 조회 실패");
            }
        });
    }

    // 선거 상태 변경
    updateStatus() {
        return new Promise(async (resolve, reject) => {
            try {
                
            } catch(err) {
                console.log(`선거 상태 변경 오류: ${err}`);
                reject("선거 상태 변경 실패");
            }
        });
    }

    // 선거 삭제
    delete(id) {
        return new Promise(async (resolve, reject) => {
            let sql = 'DELETE FROM vote WHERE ID = ?';
            try {
                let result = await db.query(sql, voteId);
                resolve(result);
            } catch(err) {
                reject(err);
                console.log(err);
            }
        });
    }
}

module.exports = new VoteModel();