"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var base_1 = require("../config/base");
var request_1 = require("./request");
var request = request_1.default.getInstance();
var isRefreshing = false;
var refreshSubscribers = [];
var subscribersTokenRefresh = function (cb) {
    refreshSubscribers.push(cb);
};
var onRefershed = function (token) {
    refreshSubscribers.map(function (cb) { return cb(token); });
};
var fetch = function (agr) {
    var method = agr.method, url = agr.url, params = agr.params;
    var token = wx.getStorageSync('token');
    method = method || 'GET';
    var requestUrl = base_1.default.baseUrl + url;
    var httpDefault = {
        url: requestUrl,
        data: params,
        method: method,
    };
    if (token) {
        return new Promise(function (resole, reject) {
            wx.request(__assign({}, httpDefault, { header: {
                    'content-type': 'application/json',
                    token: token
                }, success: function (res) {
                    if (res && res.statusCode == 401) {
                        return refreshToken(httpDefault);
                    }
                    else {
                        resole(res.data);
                    }
                },
                fail: function (err) {
                    if (err.response.status == '401') {
                        console.log('tokenfail');
                        return refreshToken(httpDefault);
                    }
                    else {
                        console.log('else');
                        reject(err);
                    }
                } }));
        }).catch(function (err) {
            console.log('err');
            console.log(err.response);
        });
    }
    else {
        return refreshToken(httpDefault);
    }
};
var refreshToken = function (httpDefault) {
    var retry = new Promise(function (resole) {
        var refershFnc = function (newToken) {
            resole(new Promise(function (resole, reject) {
                wx.request(__assign({}, httpDefault, { header: {
                        'content-type': 'application/json',
                        token: newToken
                    }, success: function (res) {
                        console.log('success');
                        resole(res.data);
                    },
                    fail: function (err) {
                        console.log('fail');
                        console.log(err.response);
                        reject(err);
                    } }));
            })
                .catch(function (err) {
                console.log('catch');
                console.log(err.response);
            }));
        };
        subscribersTokenRefresh(refershFnc);
    });
    if (!isRefreshing) {
        isRefreshing = true;
        return new Promise(function (resolve) {
            request.getAuth()
                .then(function (res) {
                console.log(res, 'res');
                if (res && res.token) {
                    onRefershed(res.token);
                    isRefreshing = false;
                    wx.setStorageSync('token', res.token);
                    resolve(retry);
                }
            })
                .catch(function (err) {
                console.log(err);
            });
        });
    }
    else {
        return Promise.resolve(retry);
    }
};
exports.default = fetch;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmV0Y2guanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmZXRjaC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUEsdUNBQW9DO0FBQ3BDLHFDQUErQjtBQUUvQixJQUFJLE9BQU8sR0FBRyxpQkFBTyxDQUFDLFdBQVcsRUFBRSxDQUFBO0FBUW5DLElBQUksWUFBWSxHQUFXLEtBQUssQ0FBQTtBQUVoQyxJQUFJLGtCQUFrQixHQUFjLEVBQUUsQ0FBQTtBQUV0QyxJQUFNLHVCQUF1QixHQUFZLFVBQUMsRUFBVztJQUNqRCxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUE7QUFDL0IsQ0FBQyxDQUFBO0FBRUQsSUFBTSxXQUFXLEdBQVksVUFBQyxLQUFZO0lBQ3RDLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxVQUFDLEVBQVcsSUFBRyxPQUFBLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBVCxDQUFTLENBQUMsQ0FBQTtBQUNwRCxDQUFDLENBQUE7QUFFRCxJQUFNLEtBQUssR0FBWSxVQUFDLEdBQTRCO0lBQzNDLElBQUEsbUJBQU0sRUFBQyxhQUFHLEVBQUMsbUJBQU0sQ0FBTztJQUM3QixJQUFNLEtBQUssR0FBRyxFQUFFLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFBO0lBQ3hDLE1BQU0sR0FBRyxNQUFNLElBQUksS0FBSyxDQUFBO0lBQ3hCLElBQU0sVUFBVSxHQUFVLGNBQU0sQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFBO0lBQzlDLElBQUksV0FBVyxHQUFnQjtRQUMzQixHQUFHLEVBQUMsVUFBVTtRQUNkLElBQUksRUFBQyxNQUFNO1FBQ1gsTUFBTSxRQUFBO0tBQ1QsQ0FBQTtJQUNELElBQUcsS0FBSyxFQUFDO1FBQ0wsT0FBTyxJQUFJLE9BQU8sQ0FBQyxVQUFDLE1BQU0sRUFBQyxNQUFNO1lBQzdCLEVBQUUsQ0FBQyxPQUFPLGNBQ0gsV0FBVyxJQUNkLE1BQU0sRUFBRTtvQkFDSixjQUFjLEVBQUUs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QUcsQ0FBQyxLQUFLLENBQUMsQ0FBQTtvQkFDckMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFBO2lCQUNqQjtZQUVMLENBQUMsQ0FBQztpQkFDRCxLQUFLLENBQUMsVUFBQSxHQUFHO2dCQUNOLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUE7WUFDcEIsQ0FBQyxDQUFDLENBQUE7UUFDTixDQUFDLENBQUMsQ0FBQTtLQUVMO1NBQUk7UUFDRCxPQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUE7S0FDaEM7QUFDTCxDQUFDLENBQUE7QUFDRCxrQkFBZSxLQUFLLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY29uZmlnIGZyb20gJy4uL2NvbmZpZy9iYXNlJztcclxuaW1wb3J0IFJlcXVlc3QgZnJvbSAnLi9yZXF1ZXN0J1xyXG5cclxubGV0IHJlcXVlc3QgPSBSZXF1ZXN0LmdldEluc3RhbmNlKClcclxuaW50ZXJmYWNlIHBhcm1hc0NvbmZpZyB7XHJcbiAgICB1cmw6c3RyaW5nLFxyXG4gICAgZGF0YT86YW55LFxyXG4gICAgbWV0aG9kOidHRVQnIHwgJ1BPU1QnIHwgJ1BVVCcgfCAnREVMRVRFJ1xyXG59XHJcblxyXG4vL+aYr+WQpuacieivt+axguato+WcqOWIt+aWsHRva2VuXHJcbmxldCBpc1JlZnJlc2hpbmc6Ym9vbGVhbiA9IGZhbHNlXHJcbi8v6KKr5oyC6LW355qE6K+35rGC55qE5pWw57uEXHJcbmxldCByZWZyZXNoU3Vic2NyaWJlcnM6QXJyYXk8YW55PiA9IFtdXHJcbi8vIOWwhuivt+axgnB1c2jliLDmlbDnu4TkuK1cclxuY29uc3Qgc3Vic2NyaWJlcnNUb2tlblJlZnJlc2g6RnVuY3Rpb24gPSAoY2I6RnVuY3Rpb24pOnZvaWQgPT57XHJcbiAgICByZWZyZXNoU3Vic2NyaWJlcnMucHVzaChjYilcclxufVxyXG4vL+WIt+aWsHRva2Vu5ZCO77yM5bCG5pWw57uE5Lit55qE6K+35rGC6YeN5paw5Y+R6LW3XHJcbmNvbnN0IG9uUmVmZXJzaGVkOkZ1bmN0aW9uID0gKHRva2VuOnN0cmluZyk9PntcclxuICAgIHJlZnJlc2hTdWJzY3JpYmVycy5tYXAoKGNiOkZ1bmN0aW9uKT0+Y2IodG9rZW4pKVxyXG59XHJcblxyXG5jb25zdCBmZXRjaDpGdW5jdGlvbiA9IChhZ3I6Q29tbW9uVHlwZS5yZXF1ZXN0Q29uZmlnKT0+e1xyXG4gICAgbGV0IHttZXRob2QsdXJsLHBhcmFtc30gPSBhZ3JcclxuICAgIGNvbnN0IHRva2VuID0gd3guZ2V0U3RvcmFnZVN5bmMoJ3Rva2VuJylcclxuICAgIG1ldGhvZCA9IG1ldGhvZCB8fCAnR0VUJ1xyXG4gICAgY29uc3QgcmVxdWVzdFVybDpzdHJpbmcgPSBjb25maWcuYmFzZVVybCArIHVybFxyXG4gICAgbGV0IGh0dHBEZWZhdWx0OnBhcm1hc0NvbmZpZyA9IHtcclxuICAgICAgICB1cmw6cmVxdWVzdFVybCxcclxuICAgICAgICBkYXRhOnBhcmFtcyxcclxuICAgICAgICBtZXRob2QsXHJcbiAgICB9XHJcbiAgICBpZih0b2tlbil7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbGUscmVqZWN0KT0+e1xyXG4gICAgICAgICAgICB3eC5yZXF1ZXN0KHtcclxuICAgICAgICAgICAgICAgIC4uLmh0dHBEZWZhdWx0LFxyXG4gICAgICAgICAgICAgICAgaGVhZGVyOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgJ2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuICAgICAgICAgICAgICAgICAgICB0b2tlblxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3MocmVzKXtcclxuICAgICAgICAgICAgICAgICAgICBpZihyZXMgJiYgcmVzLnN0YXR1c0NvZGUgPT0gNDAxKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlZnJlc2hUb2tlbihodHRwRGVmYXVsdClcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2xlKHJlcy5kYXRhKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBmYWlsKGVycil7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoZXJyLnJlc3BvbnNlLnN0YXR1cyA9PSAnNDAxJyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJy9sb2dpbidcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3Rva2VuZmFpbCcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZWZyZXNoVG9rZW4oaHR0cERlZmF1bHQpXHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdlbHNlJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycilcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSkuY2F0Y2goKGVycjphbnkpPT57XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdlcnInKVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIucmVzcG9uc2UpXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH0pXHJcbiAgICB9ZWxzZXtcclxuICAgICAgICAvL3Rva2Vu6L+H5pyf77yMXHJcbiAgICAgICAgcmV0dXJuIHJlZnJlc2hUb2tlbihodHRwRGVmYXVsdClcclxuICAgIH1cclxufVxyXG5cclxuLy90b2tlbiDov4fmnJ/mk43kvZxcclxuY29uc3QgcmVmcmVzaFRva2VuOkZ1bmN0aW9uID0gKGh0dHBEZWZhdWx0OnBhcm1hc0NvbmZpZyk9PntcclxuICAgIC8v6K+35rGC5oyC6LW3XHJcbiAgICBsZXQgcmV0cnkgPSBuZXcgUHJvbWlzZSgocmVzb2xlKT0+e1xyXG4gICAgICAgIGNvbnN0IHJlZmVyc2hGbmMgPSAobmV3VG9rZW46c3RyaW5nKSA9PntcclxuICAgICAgICAgICAgcmVzb2xlKG5ldyBQcm9taXNlKChyZXNvbGUscmVqZWN0KT0+e1xyXG4gICAgICAgICAgICAgICAgd3gucmVxdWVzdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgLi4uaHR0cERlZmF1bHQsXHJcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICdjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRva2VuOm5ld1Rva2VuXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBzdWNjZXNzKHJlcyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdzdWNjZXNzJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2xlKHJlcy5kYXRhKVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgZmFpbChlcnIpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnZmFpbCcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVyci5yZXNwb25zZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycilcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2goKGVycjphbnkpPT57XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnY2F0Y2gnKVxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyLnJlc3BvbnNlKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN1YnNjcmliZXJzVG9rZW5SZWZyZXNoKHJlZmVyc2hGbmMpXHJcbiAgICB9KVxyXG4gICAgaWYoIWlzUmVmcmVzaGluZyl7XHJcbiAgICAgICAgaXNSZWZyZXNoaW5nID0gdHJ1ZTtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpPT57XHJcbiAgICAgICAgICAgIHJlcXVlc3QuZ2V0QXV0aCgpXHJcbiAgICAgICAgICAgIC50aGVuKChyZXMpPT57XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMsJ3JlcycpXHJcbiAgICAgICAgICAgICAgICBpZihyZXMgJiYgcmVzLnRva2VuKXtcclxuICAgICAgICAgICAgICAgICAgICBvblJlZmVyc2hlZChyZXMudG9rZW4pXHJcbiAgICAgICAgICAgICAgICAgICAgaXNSZWZyZXNoaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgd3guc2V0U3RvcmFnZVN5bmMoJ3Rva2VuJywgcmVzLnRva2VuKVxyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmV0cnkpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmNhdGNoKGVycj0+e1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pXHJcbiAgICAgICBcclxuICAgIH1lbHNle1xyXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocmV0cnkpXHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgZmV0Y2giXX0=