import { mount } from '@vue/test-utils'
import CustomTable from '@/components/CustomTable.vue'

describe('CustomTable', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(CustomTable)
    expect(wrapper.vm).toBeTruthy()
  })
})
