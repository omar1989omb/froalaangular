import { Component } from '@angular/core';
import Tribute, {TributeOptions} from 'tributejs';

interface TributeValue {
  key: string;
  value: string;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // Froala Editor
  options: TributeOptions<TributeValue> = {
    values: [
        { key: 'foo', value: 'Foo' },
        { key: 'bar', value: 'Bar' },
        { key: 'baz', value: 'Baz' }
    ]
  };

  public tribute = new Tribute({
    values: [
      { key: 'Phil', value: '@phil' },
      { key: 'Gordon', value: '@gordon' },
      { key: 'Jacob', value: '@jacob' },
      { key: 'Ethan', value: '@ethan' },
      { key: 'Emma', value: '@emma' },
      { key: 'Isabella', value: '@isabella' }
    ],
    selectTemplate: (item) => {
      return '<span class="fr-deletable fr-tribute">' + item.original.value + '</a></span>';
    }
  })

  public optionsEditor: Object = {
    placeholderText: 'AddComment!!',
    charCounterCount: false,
    fullPage: false,
    toolbarButtons: ['bold', 'italic', 'strikeThrough', 'underline', 
                      '|', 'fontFamily', 'fontSize', 'color',
                      '|', 'align', 'insertLink', 'emoticons', 'fontAwesome',
                      '|', 'undo', 'redo'
                    ],
    quickInsertButtons: ['embedly', 'ol', 'hr'],
    events : {
      "froalaEditor.initialized": (e, editor) => {
        const trib_local = this.tribute;
        this.tribute.attach(editor.el);

        editor.events.on('keydown', (keydownEvent) => {
          if (keydownEvent.keyCode === 13 && this.tribute.isActive) {
            e.preventDefault();
            e.stopPropagation();
            keydownEvent.preventDefault();
            keydownEvent.stopPropagation();
            console.log('Intilized');
            return false;
          }
        }, true);
      },
      "froalaEditor.keydown": (e, editor, keydownEvent) => {
        if(keydownEvent.originalEvent.key === 'Enter' && this.tribute.isActive) {
          e.preventDefault();
          e.stopPropagation();
          keydownEvent.preventDefault();
          keydownEvent.stopPropagation();
          console.log('KeydownEvent');
          return false;
        }
      }
    }
  }
}
