export default function objectToFormData(obj, form, namespace) {
    var vm = this, fd = form || new FormData();
    var formKey;
    for (var property in obj) {
        if (obj.hasOwnProperty(property)) {
            if (namespace) {
                formKey = namespace + '[' + property + ']';
            } else {
                formKey = property;
            }
            if (typeof obj[property] === 'object' && !(obj[property] instanceof File)) {
                objectToFormData(obj[property], fd, property);
            } else {
// if it's a string or a File object
                fd.append(formKey, obj[property]);
            }
        }
    }
    return fd;
}