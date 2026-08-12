import type {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

/**
 * The Pulze API is self-hosted, so the base URL is a credential field, not a
 * constant — there is no single "the" Pulze API host to hardcode.
 *
 * Both account tokens and instance tokens authenticate the same way (a plain
 * Bearer header), but they are NOT interchangeable in scope: an account token
 * sees every instance under the account, an instance token only its own
 * instance, and a handful of endpoints (e.g. "List Instances") require an
 * account token outright. The credential test below adapts to that: if the
 * user fills in an instance name (a sign they hold an instance token), the
 * test checks that specific instance instead of asking for the full list.
 */
export class PulzeMsgApi implements ICredentialType {
	name = 'pulzeMsgApi';

	displayName = 'Pulze API';

	icon = { light: 'file:../nodes/PulzeMsg/pulzeMsg.svg', dark: 'file:../nodes/PulzeMsg/pulzeMsg.dark.svg' } as const;

	documentationUrl =
		'https://github.com/elmoalmeida/n8n-nodes-pulze-msg?tab=readme-ov-file#credentials';

	properties: INodeProperties[] = [
		{
			displayName: 'Base URL',
			name: 'baseUrl',
			type: 'string',
			default: 'https://pulzeapi.botautotik.com/api/v1',
			required: true,
			placeholder: 'https://your-server.example.com/api/v1',
			description: 'Address of your Pulze API instance, ending in /api/v1',
		},
		{
			displayName: 'Token',
			name: 'token',
			type: 'string',
			typeOptions: { password: true },
			required: true,
			default: '',
			description:
				'Account token (dashboard: Admin -> My Account) or an instance token. ' +
				'An account token can see every instance; an instance token is limited to its own instance and gets a 403 on account-only operations such as "List Instances".',
		},
		{
			displayName: 'Instance (for Testing the Connection)',
			name: 'instanceName',
			type: 'string',
			default: '',
			placeholder: 'my-instance',
			description:
				'Optional. Leave empty if the Token above is an account token. ' +
				'If it is an instance token, fill in its instance name so the "Test" button can check the right endpoint.',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '=Bearer {{$credentials.token}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials.baseUrl}}',
			url: '={{$credentials.instanceName ? "/instance/status/" + $credentials.instanceName : "/instance/list"}}',
		},
	};
}
