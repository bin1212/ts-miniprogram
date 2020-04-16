"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var base_1 = require("../../config/base");
var Request = (function () {
    function Request() {
        console.log(base_1.baseUrl, 112321);
    }
    Request.prototype.fetch = function (agr) {
        var method = agr.method, url = agr.url, param = agr.param;
        var token = wx.getStorageSync('token');
        console.log(method, url, param);
        return new Promise(function (resole, reject) {
            wx.request({
                url: base_1.baseUrl + url,
                data: param,
                method: method,
                header: {
                    'content-type': 'application/json',
                    token: token
                },
                success: function (res) {
                    resole(res);
                },
                fail: function (err) {
                    reject(err);
                }
            });
        }).catch(function (err) {
            console.log(err);
        });
    };
    Request.prototype.getAUth = function () {
        var _this = this;
        wx.login({
            success: function (res) {
                console.log(res.code);
                _this.fetch({
                    method: 'POST',
                    url: 'api/auth/login',
                    param: {
                        code: res.code
                    }
                });
            },
        });
    };
    return Request;
}());
exports.default = new Request();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVxdWVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInJlcXVlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwwQ0FBMEM7QUFHMUM7SUFDSTtRQUNJLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBTyxFQUFDLE1BQU0sQ0FBQyxDQUFBO0lBQy9CLENBQUM7SUFDRCx1QkFBSyxHQUFMLFVBQU0sR0FBZTtRQUNaLElBQUEsbUJBQU0sRUFBQyxhQUFHLEVBQUMsaUJBQUssQ0FBTztRQUM1QixJQUFNLEtBQUssR0FBRyxFQUFFLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFBO1FBQ3hDLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFDLEdBQUcsRUFBQyxLQUFLLENBQUMsQ0FBQTtRQUM3QixPQUFPLElBQUksT0FBTyxDQUFDLFVBQUMsTUFBTSxFQUFDLE1BQU07WUFDN0IsRUFBRSxDQUFDLE9BQU8sQ0FBQztnQkFDUCxHQUFHLEVBQUMsY0FBTyxHQUFHLEdBQUc7Z0JBQ2pCLElBQUksRUFBQyxLQUFLO2dCQUNWLE1BQU0sUUFBQTtnQkFDTixNQUFNLEVBQUU7b0JBQ0osY0FBYyxFQUFFLGtCQUFrQjtvQkFDbEMsS0FBSyxPQUFBO2lCQUNSO2dCQUNELE9BQU8sWUFBQyxHQUFHO29CQUNQLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQTtnQkFDZixDQUFDO2dCQUNELElBQUksWUFBQyxHQUFHO29CQUNKLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQTtnQkFDZixDQUFDO2FBQ0osQ0FBQyxDQUFBO1FBQ04sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQUMsR0FBTztZQUNiLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUE7UUFDcEIsQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDO0lBQ0QseUJBQU8sR0FBUDtRQUFBLGlCQWNDO1FBYkcsRUFBRSxDQUFDLEtBQUssQ0FBQztZQUNMLE9BQU8sRUFBRSxVQUFBLEdBQUc7Z0JBQ1YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUE7Z0JBQ3JCLEtBQUksQ0FBQyxLQUFLLENBQUM7b0JBQ1QsTUFBTSxFQUFDLE1BQU07b0JBQ2IsR0FBRyxFQUFDLGdCQUFnQjtvQkFDcEIsS0FBSyxFQUFDO3dCQUNGLElBQUksRUFBQyxHQUFHLENBQUMsSUFBSTtxQkFDaEI7aUJBQ0YsQ0FBQyxDQUFBO1lBRUosQ0FBQztTQUNGLENBQUMsQ0FBQTtJQUNSLENBQUM7SUFDTCxjQUFDO0FBQUQsQ0FBQyxBQTNDRCxJQTJDQztBQUNELGtCQUFlLElBQUksT0FBTyxFQUFFLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2Jhc2VVcmx9IGZyb20gJy4uLy4uL2NvbmZpZy9iYXNlJztcclxuaW1wb3J0IHtjb21tb25GZXRjaH0gZnJvbSAnLi90eXBlJ1xyXG5cclxuY2xhc3MgUmVxdWVzdHtcclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgY29uc29sZS5sb2coYmFzZVVybCwxMTIzMjEpXHJcbiAgICB9XHJcbiAgICBmZXRjaChhZ3I6Y29tbW9uRmV0Y2gpe1xyXG4gICAgICAgIGxldCB7bWV0aG9kLHVybCxwYXJhbX0gPSBhZ3JcclxuICAgICAgICBjb25zdCB0b2tlbiA9IHd4LmdldFN0b3JhZ2VTeW5jKCd0b2tlbicpXHJcbiAgICAgICAgY29uc29sZS5sb2cobWV0aG9kLHVybCxwYXJhbSlcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sZSxyZWplY3QpPT57XHJcbiAgICAgICAgICAgIHd4LnJlcXVlc3Qoe1xyXG4gICAgICAgICAgICAgICAgdXJsOmJhc2VVcmwgKyB1cmwsXHJcbiAgICAgICAgICAgICAgICBkYXRhOnBhcmFtLFxyXG4gICAgICAgICAgICAgICAgbWV0aG9kLFxyXG4gICAgICAgICAgICAgICAgaGVhZGVyOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgJ2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuICAgICAgICAgICAgICAgICAgICB0b2tlblxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3MocmVzKXtcclxuICAgICAgICAgICAgICAgICAgICByZXNvbGUocmVzKVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGZhaWwoZXJyKXtcclxuICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pLmNhdGNoKChlcnI6YW55KT0+e1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuICAgIGdldEFVdGgoKXtcclxuICAgICAgICB3eC5sb2dpbih7XHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzLmNvZGUpXHJcbiAgICAgICAgICAgICAgdGhpcy5mZXRjaCh7XHJcbiAgICAgICAgICAgICAgICBtZXRob2Q6J1BPU1QnLFxyXG4gICAgICAgICAgICAgICAgdXJsOidhcGkvYXV0aC9sb2dpbicsXHJcbiAgICAgICAgICAgICAgICBwYXJhbTp7XHJcbiAgICAgICAgICAgICAgICAgICAgY29kZTpyZXMuY29kZSBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgIC8vIOWPkemAgSByZXMuY29kZSDliLDlkI7lj7DmjaLlj5Ygb3BlbklkLCBzZXNzaW9uS2V5LCB1bmlvbklkXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICB9KVxyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IG5ldyBSZXF1ZXN0KCkiXX0=