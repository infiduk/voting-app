class Admin {
    create(admin) {
        return new Promise(async (resolve, reject) => {
            let sql = 'INSERT INTO admin SET ?';
            try {
                let result = await db.query(sql, admin);
                resolve(result);
            } catch (err) {
                console.log(err);
                reject(err);
            }
        });
    }

    select(admin) {
        return new Promise(async (resolve, reject) => {
            let sql = "SELECT * FROM admin WHERE UID = '" + admin.uid + "' AND PASSWORD = '" + admin.password + "'";
            try {
                let result = await db.query(sql);
                resolve(result);
            } catch (err) {
                console.log(err);
                reject(err);
            }
        });
    }
}

module.exports = new Admin();