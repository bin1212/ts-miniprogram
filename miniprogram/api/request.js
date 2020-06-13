"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var base_1 = require("../config/base");
var Request = (function () {
    function Request() {
    }
    Request.prototype.fetch = function (agr) {
        var method = agr.method, url = agr.url, params = agr.params;
        var token = wx.getStorageSync('token');
        console.log(method, url, params);
        method = method || 'GET';
        return new Promise(function (resolve, reject) {
            wx.request({
                url: base_1.default.baseUrl + url,
                data: params,
                method: method,
                header: {
                    'content-type': 'application/json',
                    token: token
                },
                success: function (res) {
                    resolve(res.data);
                },
                fail: function (err) {
                    reject(err);
                }
            });
        }).catch(function (err) {
            console.log(err);
        });
    };
    Request.prototype.getAuth = function () {
        var _this = this;
        return new Promise(function (resolve) {
            wx.login({
                success: function (res) {
                    resolve(_this.fetch({
                        method: 'POST',
                        url: '/api/auth/login',
                        params: {
                            code: res.code
                        }
                    }));
                },
            });
        });
    };
    Request.getInstance = function () {
        console.log('out');
        if (this._instance == null) {
            console.log('in');
            this._instance = new Request();
        }
        return this._instance;
    };
    return Request;
}());
exports.default = Request;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVxdWVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInJlcXVlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx1Q0FBb0M7QUFHcEM7SUFDSTtJQUVBLENBQUM7SUFFRCx1QkFBSyxHQUFMLFVBQU0sR0FBNEI7UUFDekIsSUFBQSxtQkFBTSxFQUFDLGFBQUcsRUFBQyxtQkFBTSxDQUFPO1FBQzdCLElBQU0sS0FBSyxHQUFHLEVBQUUsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUE7UUFDeEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUMsR0FBRyxFQUFDLE1BQU0sQ0FBQyxDQUFBO1FBQzlCLE1BQU0sR0FBRyxNQUFNLElBQUksS0FBSyxDQUFBO1FBQ3hCLE9BQU8sSUFBSSxPQUFPLENBQUMsVUFBQyxPQUFPLEVBQUMsTUFBTTtZQUM5QixFQUFFLENBQUMsT0FBTyxDQUFDO2dCQUNQLEdBQUcsRUFBQyxjQUFNLENBQUMsT0FBTyxHQUFHLEdBQUc7Z0JBQ3hCLElBQUksRUFBQyxNQUFNO2dCQUNYLE1BQU0sUUFBQTtnQkFDTixNQUFNLEVBQUU7b0JBQ0osY0FBYyxFQUFFLGtCQUFrQjtvQkFDbEMsS0FBSyxPQUFBO2lCQUNSO2dCQUNELE9BQU8sWUFBQyxHQUFHO29CQUNQLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUE7Z0JBQ3JCLENBQUM7Z0JBQ0QsSUFBSSxZQUFDLEdBQUc7b0JBQ0osTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFBO2dCQUNmLENBQUM7YUFDSixDQUFDLENBQUE7UUFDTixDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBQyxHQUFPO1lBQ2IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQTtRQUNwQixDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUM7SUFDRCx5QkFBTyxHQUFQO1FBQUEsaUJBZ0JDO1FBZEcsT0FBTyxJQUFJLE9BQU8sQ0FBQyxVQUFDLE9BQU87WUFDdkIsRUFBRSxDQUFDLEtBQUssQ0FBQztnQkFDTCxPQUFPLEVBQUUsVUFBQSxHQUFHO29CQUNaLE9BQU8sQ0FBQyxLQUFJLENBQUMsS0FBSyxDQUFDO3dCQUNmLE1BQU0sRUFBQyxNQUFNO3dCQUNiLEdBQUcsRUFBQyxpQkFBaUI7d0JBQ3JCLE1BQU0sRUFBQzs0QkFDSCxJQUFJLEVBQUMsR0FBRyxDQUFDLElBQUk7eUJBQ2hCO3FCQUNGLENBQUMsQ0FBQyxDQUFBO2dCQUNMLENBQUM7YUFDRixDQUFDLENBQUE7UUFDUixDQUFDLENBQUMsQ0FBQTtJQUVOLENBQUM7SUFDYSxtQkFBVyxHQUF6QjtRQUNJLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUE7UUFDbEIsSUFBRyxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksRUFBQztZQUN0QixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFBO1lBQ2pCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQTtTQUNqQztRQUNELE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQTtJQUN6QixDQUFDO0lBQ0wsY0FBQztBQUFELENBQUMsQUF2REQsSUF1REM7QUFPRCxrQkFBZSxPQUFPLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY29uZmlnIGZyb20gJy4uL2NvbmZpZy9iYXNlJztcclxuLy8gaW1wb3J0IHtjb21tb25GZXRjaH0gZnJvbSAnLi90eXBlJ1xyXG5cclxuY2xhc3MgUmVxdWVzdHtcclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgLy8gdGhpc1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlOiBSZXF1ZXN0O1xyXG4gICAgZmV0Y2goYWdyOkNvbW1vblR5cGUucmVxdWVzdENvbmZpZyl7XHJcbiAgICAgICAgbGV0IHttZXRob2QsdXJsLHBhcmFtc30gPSBhZ3JcclxuICAgICAgICBjb25zdCB0b2tlbiA9IHd4LmdldFN0b3JhZ2VTeW5jKCd0b2tlbicpXHJcbiAgICAgICAgY29uc29sZS5sb2cobWV0aG9kLHVybCxwYXJhbXMpXHJcbiAgICAgICAgbWV0aG9kID0gbWV0aG9kIHx8ICdHRVQnXHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLHJlamVjdCk9PntcclxuICAgICAgICAgICAgd3gucmVxdWVzdCh7XHJcbiAgICAgICAgICAgICAgICB1cmw6Y29uZmlnLmJhc2VVcmwgKyB1cmwsXHJcbiAgICAgICAgICAgICAgICBkYXRhOnBhcmFtcyxcclxuICAgICAgICAgICAgICAgIG1ldGhvZCxcclxuICAgICAgICAgICAgICAgIGhlYWRlcjoge1xyXG4gICAgICAgICAgICAgICAgICAgICdjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXHJcbiAgICAgICAgICAgICAgICAgICAgdG9rZW5cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzKHJlcyl7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXMuZGF0YSlcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBmYWlsKGVycil7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycilcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KS5jYXRjaCgoZXJyOmFueSk9PntcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbiAgICBnZXRBdXRoKCl7XHJcbiAgICAgICAgIC8vIOWPkemAgSByZXMuY29kZSDliLDlkI7lj7DmjaLlj5Ygb3BlbklkLCBzZXNzaW9uS2V5LCB1bmlvbklkIFxyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSk9PntcclxuICAgICAgICAgICAgd3gubG9naW4oe1xyXG4gICAgICAgICAgICAgICAgc3VjY2VzczogcmVzID0+IHtcclxuICAgICAgICAgICAgICAgIHJlc29sdmUodGhpcy5mZXRjaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kOidQT1NUJyxcclxuICAgICAgICAgICAgICAgICAgICB1cmw6Jy9hcGkvYXV0aC9sb2dpbicsXHJcbiAgICAgICAgICAgICAgICAgICAgcGFyYW1zOntcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29kZTpyZXMuY29kZSBcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgIH0pKVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgXHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc3RhdGljIGdldEluc3RhbmNlKCl7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ291dCcpXHJcbiAgICAgICAgaWYodGhpcy5faW5zdGFuY2UgPT0gbnVsbCl7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdpbicpXHJcbiAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlID0gbmV3IFJlcXVlc3QoKVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5faW5zdGFuY2VcclxuICAgIH1cclxufVxyXG5cclxuLy8gY29uc3QgY29tbW9uUmVxdWVzdCA9IFJlcXVlc3QuZ2V0SW5zdGFuY2UoKVxyXG5cclxuLy8gZXhwb3J0IHtjb21tb25SZXF1ZXN0fVxyXG5cclxuLy8gZXhwb3J0IGRlZmF1bHQgY29tbW9uUmVxdWVzdC5mZXRjaFxyXG5leHBvcnQgZGVmYXVsdCBSZXF1ZXN0Il19