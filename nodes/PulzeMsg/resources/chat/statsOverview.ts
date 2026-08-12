import type { INodeProperties } from 'n8n-workflow';

export const chatStatsOverviewDescription: INodeProperties[] = [
  {
    displayName: 'Options',
    name: 'options',
    type: 'collection',
    placeholder: 'Add Option',
    default: {},
    displayOptions: { show: { operation: ['statsOverview'], resource: ['chat'] } },
    options: [
        {
          displayName: "Days",
          name: "days",
          type: "number",
          default: 0,
          description: "Limits to the last N days (by message timestamp). Empty or 0 means no limit, aggregate since the beginning.",
          routing: { send: { type: "query", property: "days" } },
        },
        {
          displayName: "Instance",
          name: "instance",
          type: "string",
          default: '',
          description: "Name of one instance — limits the aggregation to it. Empty sums every instance visible to the caller.",
          routing: { send: { type: "query", property: "instance" } },
        }
    ],
  }
];
