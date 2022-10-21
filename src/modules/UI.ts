
import manageData from './manageData';
import { todos } from './todoList';

export default (function UI() {

    function handleEditForm(index: number, projectName: string) {
        
    };

    function toggleDeleteBtn() {
        const deleteBtnEl = document.querySelectorAll('.fa-trash-can');
        const deleteBtn: NodeListOf<Element> = deleteBtnEl!;
        const deletePopupEl = document.querySelector('.popup-delete-todo');
        const deletePopup: Element = deletePopupEl!;

        deleteBtn.forEach(btn => {
            btn.addEventListener('click', e => {
                deletePopup.classList.remove('invisible-delete-todo');
                handleDeleteBtn(e);
            });
        });
    };

    function handleDeleteBtn(e: Event) {
        const deletePopupEl = document.querySelector('.popup-delete-todo');
        const deletePopup: Element = deletePopupEl!;
        const deleteConfirmEl = document.querySelector('.delete-todo-confirm-btn');
        const deleteConfirm: Element = deleteConfirmEl!;
        const deleteCancelEl = document.querySelector('.delete-todo-cancel-btn');
        const deleteCancel: Element = deleteCancelEl!;

        deleteConfirm.addEventListener('click', () => {
            manageData.deleteTodo(e, todos);
            deletePopup.classList.add('invisible-delete-todo');
        });

        deleteCancel.addEventListener('click', () => deletePopup.classList.add('invisible-delete-todo'));
    };
})();