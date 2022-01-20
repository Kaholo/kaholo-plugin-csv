function _normalizeValue(value) {
    return `"${value.replace(new RegExp('"', 'g'), '""')}"`
}

module.exports = {
    _normalizeValue
}