import displayData from './displayData';
import manageData from './manageData';
import { todos } from './todoList';

export default (function UI() {

    function toggleCheckbox() {
        
    };

    function toggleNotesBtn() {
        const notesBtnEl = document.querySelectorAll('.item-notes');
        const notesBtn: NodeListOf<Element> = notesBtnEl!;
        const notesEl = document.querySelector('.popup-notes');
        const notesCard: Element = notesEl!;
        const notesCloseEl = document.querySelector('.notes-close');
        const notesClose: Element = notesCloseEl!;
        
        notesBtn.forEach(btn => {
            btn.addEventListener('click', e => displayData.renderNotesPopup(e, todos));
            notesClose.addEventListener('click', () => notesCard.classList.add('invisible-notes'));
        });
    };

    function toggleEditBtn() {
        const editBtnEl = document.querySelectorAll('.fa-pen-to-square');
        const editBtn: NodeListOf<Element> = editBtnEl!;
        
        editBtn.forEach(btn => {
            btn.addEventListener('click', e => {
                let item: number;
                let project: string;
                const target = e.target;

                if (target instanceof HTMLElement) {
                    const itemParent = target.parentElement;
                    if (itemParent instanceof HTMLElement) {
                        const itemGrandparent = itemParent.parentElement;
                        if (itemGrandparent instanceof HTMLElement) {
                            item = Number(itemGrandparent.dataset.index);
                            project = itemGrandparent.dataset.project!;

                            displayData.renderEditPopup(item, project, todos);
                            handleEditForm(item, project);
                        }
                    }
                }
            });
        });
    };

    function handleEditForm(index: number, projectName: string) {
        const editEl = document.querySelector('.popup-edit');
        const editCard: Element = editEl!;
        const editCloseEl = document.querySelector('.edit-close');
        const editClose: Element = editCloseEl!;
        const editSubmitEl = document.querySelector('.edit-form');
        const editSubmit: Element = editSubmitEl!;
        const editLowEl = document.getElementById('edit-low');
        const editLowPriority: Element = editLowEl!;
        const editMediumEl = document.getElementById('edit-medium');
        const editMediumPriority: Element = editMediumEl!;
        const editHighEl = document.getElementById('edit-high');
        const editHighPriority: Element = editHighEl!;
        const editLowLabelEl = document.getElementById('edit-low-label');
        const editLowLabel: Element = editLowLabelEl!;
        const editMediumLabelEl = document.getElementById('edit-medium-label');
        const editMediumLabel: Element = editMediumLabelEl!;
        const editHighLabelEl = document.getElementById('edit-high-label');
        const editHighLabel: Element = editHighLabelEl!;

        editClose.addEventListener('click', () => editCard.classList.add('invisible-edit'));
        
        editSubmit.addEventListener('submit', e => {
            editCard.classList.add('invisible-edit');
            manageData.editTodo(index, projectName, e, todos);
        });

        editLowPriority.addEventListener('click', () => {
            if (editLowLabel.classList.contains('low')) {
                editLowLabel.classList.remove('low');
                editLowLabel.classList.add('low-checked');
            }
            if (editMediumLabel.classList.contains('medium-checked')) {
                editMediumLabel.classList.remove('medium-checked');
                editMediumLabel.classList.add('medium');
            }
            if (editHighLabel.classList.contains('high-checked')) {
                editHighLabel.classList.remove('high-checked');
                editHighLabel.classList.add('high');
            }
        });

        editMediumPriority.addEventListener('click', () => {
            if (editLowLabel.classList.contains('low-checked')) {
                editLowLabel.classList.remove('low-checked');
                editLowLabel.classList.add('low');
            }
            if (editMediumLabel.classList.contains('medium')) {
                editMediumLabel.classList.remove('medium');
                editMediumLabel.classList.add('medium-checked');
            }
            if (editHighLabel.classList.contains('high-checked')) {
                editHighLabel.classList.remove('high-checked');
                editHighLabel.classList.add('high');
            }
        });

        editHighPriority.addEventListener('click', () => {
            if (editLowLabel.classList.contains('low-checked')) {
                editLowLabel.classList.remove('low-checked');
                editLowLabel.classList.add('low');
            }
            if (editMediumLabel.classList.contains('medium-checked')) {
                editMediumLabel.classList.remove('medium-checked');
                editMediumLabel.classList.add('medium');
            }
            if (editHighLabel.classList.contains('high')) {
                editHighLabel.classList.remove('high');
                editHighLabel.classList.add('high-checked');
            }
        });
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