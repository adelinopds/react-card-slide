import React from 'react';

import './sass/card-slide-item.scss';

/**
 * Card de exibição básica
 * @todo Contém um título (o assunto do card)
 * @todo Contém um ícone que é exibido ao lado esquerdo do título
 * @todo Contém uma descrição básica sobre o assunto
 * @todo Exibe um valor sobre o card
 * @todo Pode exibir um gráfico
 * @todo Pode exibir um dado de rodapé
 * @todo Pode exibir uma imagem no corpo do card
*/
class CardSlideItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cardHeaderIcon: require('./images/graph.png'),
            cardName: 'Nome do card',
            cardDescription: 'Descrição do card',
            cardTotal: 0,
            cardData: [],
            cardGraphLineColor: '#30B1FF',
            cardGraphBgColor: '#D6EFFF',
            rendered: false,
            isSelected: true,
            slideAnimation: '',
            showBodyImage: false,
            showBodyText: true,
            bodyImage: null
        }

        this.renderStateProps = this.renderStateProps.bind(this);
        this.updateRenderStateProps = this.updateRenderStateProps.bind(this);
    }

    /**
     * Registra os dados que vierem do props caso existam no state
     */
    async renderStateProps() {
        try {
            const state = Object.assign({}, this.state);
            for (let key in this.props) {
                if (state.hasOwnProperty(key)) {
                    state[key] = this.props[key];
                }
            }
            state.rendered = true;
            this.setState(state);
        }
        catch(error) {
            return;
        }
    }

    /**
     * Atualiza os dados que vierem do props caso existam no state
     */
    updateRenderStateProps = (prevProps) => {
        if (this.state.rendered === false) return false;
        try {
            if (prevProps !== this.props) {
                const state = Object.assign({}, this.state);
                for (let key in this.state) {
                    if (this.props.hasOwnProperty(key) && this.props[key] !== prevProps[key]) {
                        state[key] = this.props[key];
                    }
                }
                this.setState(state);
            } else {
                return false;
            }
        }
        catch(error) {
            return false;
        }
    }

    componentDidMount() {
        this.renderStateProps();
    }

    componentDidUpdate(prevProps) {
        this.updateRenderStateProps(prevProps);
    }

    render() {
      try {
        const { cardHeaderIcon, cardName, cardDescription, cardTotal, isSelected, slideAnimation, showBodyImage, bodyImage } = this.state;
        return (
            <div className={`card-slide-item ${isSelected === true ? ('enabled ' + slideAnimation) : 'disabled'}`}>
                <div className='card'>
                    <div className='card-header'>
                        <div className='card-header-icon'>
                            <img className='icon-card' src={cardHeaderIcon} alt={cardName}/>
                        </div>
                        <div className='card-header-title'>{cardName}</div>
                    </div>
                    <div className='card-body'>
                        <div className='card-body-description'>{cardDescription}</div>
                        <div className='card-body-total'>{cardTotal}</div>
                        {showBodyImage === true && <img className='img-fluid' src={bodyImage} alt={cardDescription}/>}
                        <div className='card-body-graph'></div>
                    </div>
                    <div className='card-footer'></div>
                </div>
            </div>
        );
      }
      catch(error) {
        return(
            <div className='card-slide'>
                <div className='card'>
                    <div className='card-header'>
                        <div className='card-header-title'>Falha ao renderizar</div>
                    </div>
                    <div className='card-body'>
                        <div className='card-body-description'>{error.message}</div>
                    </div>
                </div>
            </div>
        );
      }
    }
}

export default CardSlideItem;