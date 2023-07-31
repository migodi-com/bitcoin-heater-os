<script setup>
import { useSettingsStore } from '@/stores/settings'
import { useApiStore } from '@/stores/api'
import AppHeader from '@/components/AppHeader.vue'
import AppHeaderBackLink from '@/components/AppHeaderBackLink.vue'
import IconWifi from '@/components/icons/IconWifi.vue'
import IconArrowLeft from '@/components/icons/IconArrowLeft.vue'
import AppCard from '@/components/AppCard.vue'
import AppRadioInput from '@/components/AppRadioInput.vue'
import languages from '@/locales/languages.json'

const settingsStore = useSettingsStore()
const api = useApiStore()

function changeLanguage(e) {
	api.post('settings/language', {
		language: e.target.value
	})
}
</script>

<template>
	<div>
		<AppHeader>
			<AppHeaderBackLink :name="$t('settings')" :linkTo="{ name: 'Settings' }" />
		</AppHeader>
		
		<div class="text-2xl mb-5 lg:text-4xl lg:mb-7">{{ $t('language') }}</div>
		
		<AppCard>
			<div class="flex flex-col divide-y divide-gray-50/30">
				<template v-for="(language, key) in languages" :key="key">
					<AppRadioInput name="language" :val="key" :label="language" v-model="$i18n.locale" @change="changeLanguage" class="py-4 first:pt-0 last:pb-0 lg:py-5" />
				</template>
			</div>
		</AppCard>
	</div>
</template>
