import Swal from 'sweetalert2';

export const SweetAlert = (text, title, type, confirmButtonText, callback) => (Swal.fire({
        text,
        title,
        icon: type,
        confirmButtonText,
        allowOutsideClick: false
    }).then( (value) => {
        if(value.isConfirmed) {
            callback()
        }
    }))