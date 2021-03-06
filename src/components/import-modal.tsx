import React, { Component } from "react";

import machine from "../machine";
import Icon from "./icon";
import "./modal/modal.scss";
import { fromHex } from "../utils";

type ImportModalProps = {
    onSubmit?: () => {};
};

class ImportModal extends Component<ImportModalProps> {
    $inp?: HTMLTextAreaElement;

    import() {
        const values = this.$inp?.value || "";
        const lines = values.split("\n");
        machine.comments.fill("");
        lines.forEach((v, i) => {
            const index = i * 2;
            const comment = (/;(.+)/.exec(v) || [])[1] || "";
            machine.comments[i] = comment.replace(/;$/, "");
            machine.ram[index] = fromHex(v.substr(0, 2) || "00");
            machine.ram[index + 1] = fromHex(v.substr(2, 2) || "00");
        });
        machine.showingModal = "";
    }

    render() {
        return (
            <div className="modal">
                <div className="container">
                    <button
                        className="close"
                        onClick={() => {
                            machine.showingModal = "";
                        }}
                    >
                        <Icon icon="close" />
                    </button>
                    <p>Paste the code below in hexadecimal:</p>
                    <textarea
                        autoFocus // eslint-disable-line jsx-a11y/no-autofocus
                        ref={(inp) => {
                            this.$inp = inp || undefined;
                        }}
                    />
                    <button className="submit" onClick={() => this.import()}>
                        Import
                    </button>
                </div>
            </div>
        );
    }
}

export default ImportModal;
