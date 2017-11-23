/**
 * Created by ZhaoYu on 2017/11/23.
 */
var axios = require('axios')
var numberstart=866260030775571;
var fs =require('fs')
function sendNumber(number) {
    return new Promise(function (resolve, reject) {
        axios({
            url: 'http://openapi.micard.10046.mi.com/fMa/queryFMaStatusByPhoneNumber',
            method: 'post',
            headers: {
                "Connection": "keep-alive",
                "Accept": "application/x-www-form-urlencoded, application/json;q=0.8, text/plain;q=0.5, */*;q=0.2",
                "X-Requested-With": "rest.js",
                "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1",
                "Content-Type": "application/x-www-form-urlencoded",
                "Referer": "http://service.micard.10046.mi.com/ctmicard/jingdong_mifen_query",
                "Accept-Language": "zh-CN,zh;q=0.8,en;q=0.6"
            },
            transformRequest: [function (data) {
                // Do whatever you want to transform the data
                let ret = ''
                for (let it in data) {
                    ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                }
                return ret
            }],
            data: {
                phoneNumber: number
            },
        })
            .then(function (response) {
                resolve(response.data)
            })
            .catch(function (error) {
                reject(error)
            });
    })
}

async function exec() {
    for(;numberstart<866260030999999;numberstart++){
        try{
            var res=await sendNumber(numberstart);
            console.log("imei:",numberstart,res)
            if(!res.length)continue;
            fs.appendFile('message.txt', JSON.stringify({imei:numberstart,res:res}), (err) => {
                if (err) throw err;
            });
            console.log(`imei${numberstart} 写入成功`)
        }catch (e){
            console.log(e)
        }
    }
}
exec();




