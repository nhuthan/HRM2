export function HttpError(error, res) {
    this.error = error.error || error.Message || "Error network";
    this.message = error.message || error.error_description || error.MessageDetail || error.ExceptionMessage || res.statusText || "Lỗi không xác đinh";
    this.status = res.status;
    this.statusText = res.statusText;
    this.url = res.url;
    this.stack = new Error().stack.split('\n').slice(1).join('\n');
    this.type = 'http';
}
HttpError.prototype = Object.create(Error.prototype);
HttpError.prototype.toString = function () {
    return `Http: ${this.error}\n${this.message}`;
};

export function NetworkError(error, url) {
    this.error = error.error || "Error server";
    this.message = error.message === 'Failed to fetch' ? 'Error connect to server' : (error.message || "Not connect");
    this.stack = error.stack && error.stack.replace('TypeError', 'NetworkError');
    this.url = url;
    this.type = 'network';
}
NetworkError.prototype = Object.create(Error.prototype);
NetworkError.prototype.toString = function () {
    return `Network: ${this.error}\n${this.message}`;
};

export function DataError(error, url) {
    for (let key in error) {
        this[key] = error[key];
    }
    this.url = url;
    this.type = 'data';
}
DataError.prototype = Object.create(Error.prototype);
DataError.prototype.toString = function () {
    return `Data: ${this.error}\n${this.message}`;
};