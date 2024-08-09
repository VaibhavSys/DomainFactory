<template>
    <div class="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center">
            <div v-if="view === 'domain'" class="flex items-center justify-center">
                <div class="max-w-lg p-8 rounded-lg shadow-lg bg-gray-800">
                    <h1 class="text-3xl font-bold mb-4">What domain do you want?</h1>
                    <form @submit.prevent="submitDomain">
                        <div class="flex items-center">
                            <input v-model="domain" required type="text" class="flex-1 py-2 px-4 rounded-l-lg focus:outline-none focus:ring focus:border-blue-300 bg-gray-700 text-white" placeholder="Enter your domain name">
                            <button type="submit" class="py-2 px-4 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
            
            <div v-else-if="view === 'owner'" class="flex items-center justify-center">
                <div class="max-w-lg p-8 rounded-lg shadow-lg bg-gray-800">
                    <h1 class="text-3xl font-bold mb-4">Tell us a little about yourself</h1>
                    <form @submit.prevent="submitOwnerInfo">
                        <div class="flex flex-col space-y-4">
                            <input v-model="githubUsername" required type="text" class="py-2 px-4 rounded-lg focus:outline-none focus:ring focus:border-blue-300 bg-gray-700 text-white" placeholder="GitHub Username">
                            <input v-model="email" type="email" class="py-2 px-4 rounded-lg focus:outline-none focus:ring focus:border-blue-300 bg-gray-700 text-white" placeholder="Email">
                            
                            <div v-for="(handle, platform) in otherContacts" :key="platform" class="flex space-x-2 items-center">
                                <input :value="platform" disabled type="text" class="w-1/2 py-2 px-4 rounded-lg focus:outline-none focus:ring focus:border-blue-300 bg-gray-700 text-white" placeholder="Platform Name">
                                <input :value="handle" disabled type="text" class="w-1/2 py-2 px-4 rounded-lg focus:outline-none focus:ring focus:border-blue-300 bg-gray-700 text-white" placeholder="Handle/Username">
                                <button type="button" @click="removeContact(platform)" class="py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring focus:border-red-300">Delete</button>
                            </div>
                            
                            <div class="flex space-x-2 items-center">
                                <input v-model="otherPlatformName" type="text" class="w-1/2 py-2 px-4 rounded-lg focus:outline-none focus:ring focus:border-blue-300 bg-gray-700 text-white" placeholder="Platform Name">
                                <input v-model="otherPlatformHandle" type="text" class="w-1/2 py-2 px-4 rounded-lg focus:outline-none focus:ring focus:border-blue-300 bg-gray-700 text-white" placeholder="Handle/Username">
                                <button @click="addContact" type="button" class="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300">Add</button>
                            </div>
                            
                            <p class="text-sm text-gray-400">At least one form of contact (Email or Other Platform) is required.</p>
                            
                            <button type="submit" class="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
            
            <div v-else-if="view === 'project'" class="flex items-center justify-center">
                <div class="max-w-lg p-8 rounded-lg shadow-lg bg-gray-800">
                    <h1 class="text-3xl font-bold mb-4">Tell us about your project</h1>
                    <form @submit.prevent="submitProjectInfo">
                        <div class="flex flex-col space-y-4">
                            <input v-model="description" type="text" class="py-2 px-4 rounded-lg focus:outline-none focus:ring focus:border-blue-300 bg-gray-700 text-white" placeholder="Short Description">
                            <input v-model="repositoryLink" type="text" class="py-2 px-4 rounded-lg focus:outline-none focus:ring focus:border-blue-300 bg-gray-700 text-white" placeholder="Repository Link">
                            
                            <button type="submit" class="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300">Submit</button>
                        </div>
                    </form>
                    <p class="text-sm text-center mt-2 text-gray-400">
                        Both fields are optional
                    </p>
                </div>
            </div>
            
            <div v-else-if="view === 'records'" class="flex items-center justify-center">
                <div class="max-w-2xl p-8 rounded-lg shadow-lg bg-gray-800">
                    <h1 class="text-3xl font-bold mb-6">Manage DNS Records</h1>
                    <form @submit.prevent="addRecord" class="mb-8">
                        <div class="flex flex-wrap space-y-4 md:space-y-0 md:space-x-4">
                            <select v-model="recordType" required class="w-full md:w-1/3 py-2 px-4 rounded-lg focus:outline-none focus:ring focus:border-blue-300 bg-gray-700 text-white">
                                <option value="" disabled>Record Type</option>
                                <option value="CNAME">CNAME</option>
                                <option value="A">A</option>
                                <option value="AAAA">AAAA</option>
                                <option value="URL">URL</option>
                                <option value="MX">MX</option>
                                <option value="TXT">TXT</option>
                            </select>
                            <textarea v-model="recordValue" required class="w-full md:flex-1 py-2 px-4 rounded-lg focus:outline-none focus:ring focus:border-blue-300 bg-gray-700 text-white" placeholder="Enter record value" rows="1"></textarea>
                            <button type="submit" class="w-full md:w-auto py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300">Add</button>
                        </div>
                        <p class="text-sm text-center mt-2 text-gray-400">
                            Use newline for multiple values
                        </p>
                    </form>
                    <div v-if="Object.keys(records).length > 0">
                        <h2 class="text-2xl font-bold mb-4">Current Records</h2>
                        <ul class="space-y-4">
                            <li v-for="(value, type) in records" :key="type" class="flex flex-wrap items-center space-y-4 md:space-y-0 md:space-x-4">
                                <select :value="type" disabled class="w-full md:w-1/3 py-2 px-4 rounded-lg focus:outline-none focus:ring focus:border-blue-300 bg-gray-700 text-white">
                                    <option>{{ type }}</option>
                                </select>
                                <textarea :value="value" disabled class="w-full md:flex-1 py-2 px-4 rounded-lg focus:outline-none focus:ring focus:border-blue-300 bg-gray-700 text-white" placeholder="Enter record value" rows="1"></textarea>
                                <button @click="removeRecord(type)" class="w-full md:w-auto py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring focus:border-red-300">Delete</button>
                            </li>
                        </ul>
                        <button @click="submitRecords" class="w-full py-2 px-4 mt-8 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring focus:border-green-300">Submit Records</button>
                    </div>
                </div>
            </div>
            <div v-if="view === 'output'" class="min-h-screen">
                <div class="flex items-center justify-center">
                    <div class="max-w-4xl w-full p-8 rounded-lg shadow-lg bg-gray-800 border border-gray-700">
                        <div class="flex justify-between items-center mb-4 border-b border-gray-600 pb-2">
                            <h1 class="text-3xl font-bold">domains/{{ domain }}.json</h1>
                            <button @click="copyOutput" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                                Copy
                            </button>
                        </div>
                        <div class="rounded-lg p-4 overflow-x-auto" style="background-color: #24292e">
                            <Shiki lang="json" :code="JSON.stringify(getOutput(), null, 2)" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const view = ref('domain')
const domain = ref('');
const githubUsername = ref('');
const email = ref('');
const otherPlatformName = ref('');
const otherPlatformHandle = ref('');
const otherContacts = ref<Record<string, string>>({});
const description = ref('');
const repositoryLink = ref('');
const recordType = ref<string>('');
const recordValue = ref<string>('');
const records = ref<DNSRecords>({});

function getOutput() {
    const output = {
        description: description.value,
        repo: repositoryLink.value,
        owner: {
            username: githubUsername.value,
            email: email.value
        },
        record: records.value
    }
    
    if (!description.value) {
        delete output.description;
    }
    
    if (!repositoryLink.value) {
        delete output.repo;
    }
    
    for (let contact in otherContacts.value) {
        output.owner[contact] = otherContacts.value[contact]
    }
    
    return output;
}

function copyOutput() {
    navigator.clipboard.writeText(JSON.stringify(getOutput(), null, 2));
    alert('Copied to clipboard');
}

function submitDomain() {
    domain.value = domain.value.trim().toLowerCase();
    
    if (domain.value.endsWith('.is-a.dev')) {
        domain.value = domain.value.slice(0, -9);
    }
    
    const segments = domain.value.split('.');
    console.log(domain.value, segments);
    
    try {
        segments.forEach(validateDomain);
    }
    catch (error: any) {
        alert(error.message);
        return;
    }
    
    view.value = 'owner';
}

function addContact() {
    if (otherPlatformName.value && otherPlatformHandle.value) {
        otherContacts.value[otherPlatformName.value] = otherPlatformHandle.value;
        
        otherPlatformName.value = '';
        otherPlatformHandle.value = '';
        console.log(otherContacts.value);
    }
}

function removeContact(platform: string) {
    console.log('Delete:', platform)
    delete otherContacts.value[platform];
}

function submitOwnerInfo() {
    console.log('Domain:', domain.value);
    console.log('GitHub Username:', githubUsername.value);
    console.log('Email:', email.value);
    console.log('Other Contacts:', otherContacts.value);
    
    if (!email.value && !(Object.keys(otherContacts.value).length > 0)) {
        alert('Please provide at least one contact information');
        return;
    }
    
    view.value = 'project';
}

function submitProjectInfo() {
    console.log('GH USERNAME:', githubUsername.value);
    console.log('Description:', description.value);
    console.log('Repository Link:', repositoryLink.value);
    
    view.value = 'records';
}

function addRecord() {
    if (['A', 'AAAA', 'MX', 'TXT'].includes(recordType.value)) {
        if (!(recordType.value in records.value)) {
            records.value[recordType.value] = [];
        }
        const values = recordValue.value.split('\n').map(value => value.trim());
        records.value[recordType.value].push(...values);
    }
    else {
        records.value[recordType.value] = recordValue.value;
    }
}

function removeRecord(type: string) {
    delete records.value[type];
}

function submitRecords() {
    console.log('Records:', records.value);
    try {
        validateRecords(records.value);
    }
    catch (error: any) {
        alert(error.message);
    }
    
    view.value = 'output';
}
</script>
