export const permissions = [
    {
        role: 'user',
        actions: [
            'get_profile',
            'update_profile',
            'get_projects'
        ]
    },
    {
        role: 'freelancer',
        actions: [
            'get_profile',
            'update_profile',
            'reset_password',
            'get_project'
        ]
    }
]