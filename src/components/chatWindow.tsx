import * as React from 'react';
import { IChatWindowProps, IChatWindowState} from './IChatWindowProps';
import styles from './chatWindow.module.scss';
import { Icon, TextField, Link } from 'office-ui-fabric-react';
import { HttpClient, HttpClientResponse, IHttpClientOptions } from '@microsoft/sp-http';
import { Log } from '@microsoft/sp-core-library';
//import { animateScroll } from "react-scroll";
import { ChatBotImage } from '../extensions/chatbot/chatBotImage';
//import Markdown from 'markdown-to-jsx';

//import { IFramePanel } from "@pnp/spfx-controls-react/lib/IFramePanel";

import * as $ from 'jquery';
import { BsArrowClockwise } from "react-icons/bs";

export default class ChatWindow extends React.Component<IChatWindowProps, IChatWindowState>{

    public onInit(): Promise<void> {
        this.render();
        $('.webchat__icon-button').css('display','none');
        return Promise.resolve();
      }

    constructor(props: IChatWindowProps, state: IChatWindowState) {
        super(props);

        this.state = {
            collapsed: true,
            refresh: false
        };
    }

    public componentDidMount() {
        
        this.minimizeChatPop(true);
        $('#chatMessages iframe').css({
            'display':'block',
            'height':'100%'
        })
        $('#section2').hide();
        //$('#chatMessages').html('<iframe className={styles.iframe} src="https://webchat.botframework.com/embed/DocumentSearchBot?s=MNfoXP6exHk.KOuGdV4HNrHCrG8icMWZRjtip4VbRWWJM05yK7DQvDg">')
    }

    public render(): React.ReactElement<IChatWindowProps> {
        return (

            <div className={styles.chatWindow}>
               
                {/* Krishna added */}
                        <div>
                            {!this.isMobile ?
                                <section id={`section1`} className={`${styles.avenueMessenger} ${styles.bottom}`} onClick={() => this.minimizeChatPop(false)}>
                                    <div>
                                        <Icon className={`ms-fontSize-18`} iconName={`ChatBot`} ></Icon>
                                        Ask me
                                    </div>
                                </section>
                                :
                                <div>
                                </div>
                            }
                        </div>
                        
                        <div>
                            <section id={`section2`} style={{display:'none'}} className={styles.avenueMessenger}>

                                <div className={styles.menu}>
                                    <Icon iconName={`ChromeMinimize`} className={styles.button} onClick={() => this.minimizeChatPop(true)} ></Icon>
                                </div>
                                <div className={styles.reload}>
                                    <BsArrowClockwise className={styles.reload} onClick={() => this.refreshPage(false)} ></BsArrowClockwise>
                                </div>
                                
                                <div className={styles.agentFace}>
                                    <div className={styles.half}>
                                        <img className={styles.circle} src={ChatBotImage.base64} alt="SK BOT" /></div>
                                </div>
                                <div className={styles.chat}>
                                    <div className={styles.chatTitle}>
                                        <h1>Ask Me</h1>
                                        <h2>Your Sharepoint Expert</h2>
                                    </div>
                                    <div className={styles.messages} id={`chatMessages`}>                                            
                                            <iframe className={styles.iframe} src='https://webchat.botframework.com/embed/DocumentSearchBot?s=MNfoXP6exHk.KOuGdV4HNrHCrG8icMWZRjtip4VbRWWJM05yK7DQvDg'></iframe>
                                    </div>
                                    
                                </div>
                            </section>
                        </div>
            </div>
        );
    }


    

    
    /**
     * Minimizes or maximizes the chat pop
     * @param isCollapsed bool to make the chat pop collapse and open
     */
    private refreshPage(isCollapsed: boolean): void {
        window.location.reload();
        //this.setState({ refresh: true });
    }
    private minimizeChatPop(isCollapsed: boolean): void {
        $('.webchat__icon-button').hide();
        this.setState({ collapsed: isCollapsed });
        if(!isCollapsed){
            $('#section2').show();
            $('#section1').hide();
        }else{
            $('#section1').show();
            $('#section2').hide();

        }
    }


    

    /**
     * Checks if the device is mobile
     */
    private get isMobile(): boolean {

        return (navigator.userAgent.indexOf("Android") > -1
            || navigator.userAgent.indexOf("webOS") > -1
            || navigator.userAgent.indexOf("iPhone") > -1
            || navigator.userAgent.indexOf("iPad") > -1
            || navigator.userAgent.indexOf("iPod") > -1
            || navigator.userAgent.indexOf("BlackBerry") > -1
            || navigator.userAgent.indexOf("Windows Phone") > -1);
    }
}