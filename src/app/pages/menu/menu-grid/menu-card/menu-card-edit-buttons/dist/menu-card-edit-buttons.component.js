"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.MenuCardEditButtonsComponent = void 0;
var core_1 = require("@angular/core");
var MenuCardEditButtonsComponent = /** @class */ (function () {
    function MenuCardEditButtonsComponent() {
        this.cancelUpdateCard = new core_1.EventEmitter();
        this.deleteCard = new core_1.EventEmitter();
        this.switchCardEditMode = new core_1.EventEmitter();
    }
    MenuCardEditButtonsComponent.prototype.ngOnInit = function () {
    };
    MenuCardEditButtonsComponent.prototype.onCancelUpdateCard = function () {
        this.cancelUpdateCard.emit();
    };
    MenuCardEditButtonsComponent.prototype.onDeleteCard = function () {
        this.deleteCard.emit();
    };
    MenuCardEditButtonsComponent.prototype.onSwitchCardEditMode = function () {
        this.switchCardEditMode.emit();
    };
    MenuCardEditButtonsComponent.prototype.isFormDirty = function () {
        if (this.updateForm.dirty) {
            if (this.updateForm.get('inputTitle').value == this.menu.title)
                return false;
            else
                return true;
        }
        else
            return false;
    };
    __decorate([
        core_1.Input()
    ], MenuCardEditButtonsComponent.prototype, "btnMode");
    __decorate([
        core_1.Input()
    ], MenuCardEditButtonsComponent.prototype, "updateForm");
    __decorate([
        core_1.Input()
    ], MenuCardEditButtonsComponent.prototype, "menu");
    __decorate([
        core_1.Output()
    ], MenuCardEditButtonsComponent.prototype, "cancelUpdateCard");
    __decorate([
        core_1.Output()
    ], MenuCardEditButtonsComponent.prototype, "deleteCard");
    __decorate([
        core_1.Output()
    ], MenuCardEditButtonsComponent.prototype, "switchCardEditMode");
    MenuCardEditButtonsComponent = __decorate([
        core_1.Component({
            selector: 'app-menu-card-edit-buttons',
            templateUrl: './menu-card-edit-buttons.component.html',
            styleUrls: ['./menu-card-edit-buttons.component.css']
        })
    ], MenuCardEditButtonsComponent);
    return MenuCardEditButtonsComponent;
}());
exports.MenuCardEditButtonsComponent = MenuCardEditButtonsComponent;
