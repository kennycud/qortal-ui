import { html, LitElement } from 'lit'
import { blocksNeed } from '../../utils/functions'
import { becomeMinterStyles } from '../components/plugins-css'
import '../components/ButtonIconCopy'
import '@material/mwc-button'
import '@material/mwc-textfield'
import '@polymer/paper-spinner/paper-spinner-lite.js'
import '@vaadin/button'

// Multi language support
import { translate } from '../../../../core/translate'

class YesSponsored extends LitElement {
	static get properties() {
		return {
			addressInfo: { type: Object },
			rewardSharePublicKey: { type: String },
			isMinting: {type: Boolean}
		}
	}

	static get styles() {
		return [becomeMinterStyles]
	}

	constructor() {
		super()
		this.addressInfo = {}
		this.rewardSharePublicKey = ''
		this.isMinting = false
	}

	render() {
		return html`
			<div class="inner-container">
				<div class="column column-center">
					<div class="column column-center">
						<span class="level-black">
							${translate('becomeMinterPage.bchange10')}
						</span>
						<hr style="width: 75%; color: #eee; border-radius: 80%; margin-bottom: 2rem;">
					</div>
					<br />
					<div class="row row-center gap">
						<div class="content-box">
							<span class="title">
								${translate('walletpage.wchange41')}
							</span>
							<hr style="color: #eee; border-radius: 90%; margin-bottom: 1rem;">
							${this.isMinting ? html`
								<h4>${translate('becomeMinterPage.bchange12')}</h4>
							` : html`
								<h4>${translate('mintingpage.mchange9')}</h4>
							`}
						</div>
					</div>
					<div class="row row-center gap">
						<div class="content-box">
							<span class="title">
								${translate('becomeMinterPage.bchange13')}
							</span>
							<hr style="color: #eee; border-radius: 90%; margin-bottom: 1rem;">
							<h4>
								${this._levelUpBlocks()}
								${translate('mintingpage.mchange26')}
							</h4>
						</div>
					</div>
					<div class="row row-center gap">
						<div class="content-box">
							<span class="title">
								${translate('becomeMinterPage.bchange15')}
							</span>
							<hr style="color: #eee; border-radius: 90%; margin-bottom: 1rem;">
							<h4 class="no-margin">
								${translate('becomeMinterPage.bchange16')}
							</h4>
							<div class="row row-center column-center no-wrap">
								<p class="address">
									${this.rewardSharePublicKey}
								</p>
								<button-icon-copy
									title="${translate('walletpage.wchange3')}"
									onSuccessMessage="${translate('walletpage.wchange4')}"
									onErrorMessage="${translate('walletpage.wchange39')}"
									textToCopy=${this.rewardSharePublicKey}
									buttonSize="28px"
									iconSize="16px"
									color="var(--copybutton)"
									offsetLeft="4px"
								>
								</button-icon-copy>
							</div>
						</div>
					</div>
				</div>
			</div>
		`
	}

	firstUpdated() {
		// ...
	}

	_levelUpBlocks() {
		return (blocksNeed(0) - (this.addressInfo?.blocksMinted + this.addressInfo?.blocksMintedAdjustment)).toString()
	}

	// Standard functions
	getApiKey() {
		const myNode = window.parent.reduxStore.getState().app.nodeConfig.knownNodes[window.parent.reduxStore.getState().app.nodeConfig.node]
		return myNode.apiKey
	}

	isEmptyArray(arr) {
		if (!arr) { return true }
		return arr.length === 0
	}

	round(number) {
		return (Math.round(parseFloat(number) * 1e8) / 1e8).toFixed(8)
	}
}

window.customElements.define('yes-sponsored', YesSponsored)
