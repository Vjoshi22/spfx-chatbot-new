import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import {
  BaseApplicationCustomizer, PlaceholderContent, PlaceholderName
} from '@microsoft/sp-application-base';
import { Dialog } from '@microsoft/sp-dialog';

import * as strings from 'ChatbotApplicationCustomizerStrings';
import * as React from 'react';
import * as ReactDom from 'react-dom';
import ChatWindow from '../../components/chatWindow';

const LOG_SOURCE: string = 'ChatbotApplicationCustomizer';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IChatbotApplicationCustomizerProperties {
  // This is an example; replace with your own property
  testMessage: string;
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class ChatbotApplicationCustomizer
  extends BaseApplicationCustomizer<IChatbotApplicationCustomizerProperties> {

    private _bottomPlaceholder: PlaceholderContent | undefined;

  @override
  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, `Initialized ${strings.Title}`);

    this.context.placeholderProvider.changedEvent.add(this, this._renderPlaceHolder);

    return Promise.resolve();
  }

  private _renderPlaceHolder(): void {

    Log.info(LOG_SOURCE, this.context.placeholderProvider.placeholderNames.map(name => PlaceholderContent[name]).join(", "));

    if (!this._bottomPlaceholder) {
      this._bottomPlaceholder = this.context.placeholderProvider.tryCreateContent(PlaceholderName.Bottom);
    }

    if (this._bottomPlaceholder) {
      const element: React.ReactElement<any> = React.createElement(ChatWindow, {
      
      });

      ReactDom.render(element, this._bottomPlaceholder.domElement);
    }
  }
}
