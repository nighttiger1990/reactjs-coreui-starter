import React from 'react'

import EmailEditor from 'react-email-editor'

class MailEditor2 extends React.Component {
    render() {
        return <div>
            <EmailEditor
                ref={editor => this.editor = editor}

            />
        </div>
    }

    exportHtml = () => {
         return new Promise((resolve, reject) => {
            this.editor.exportHtml(data => {
                //eslint-disable-next-line
                const { design, html } = data
                resolve(html)
            })
        })
    }
}

export default MailEditor2