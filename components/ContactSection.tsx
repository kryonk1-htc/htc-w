'use client';

import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');

    try {
      const { error } = await supabase
        .from('contact_messages')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            message: formData.message
          }
        ]);

      if (error) throw error;

      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('提交失败:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="py-24 px-6 bg-gradient-to-b from-white to-purple-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">联系我</h2>
          <div className="w-20 h-1 bg-purple-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            有任何想法或建议？欢迎与我交流
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">保持联系</h3>
              <p className="text-gray-600 leading-relaxed mb-8">
                很高兴能与你交流。无论是合作机会、问题咨询，还是单纯想聊聊天，都欢迎通过以下方式联系我。
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <i className="ri-mail-line text-xl text-purple-600"></i>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">邮箱</h4>
                  <p className="text-gray-600">hello@example.com</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <i className="ri-map-pin-line text-xl text-purple-600"></i>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">位置</h4>
                  <p className="text-gray-600">中国，北京</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <i className="ri-time-line text-xl text-purple-600"></i>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">回复时间</h4>
                  <p className="text-gray-600">通常24小时内回复</p>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <h4 className="font-semibold text-gray-900 mb-4">关注我</h4>
              <div className="flex space-x-4">
                <button className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center hover:bg-purple-700 transition-colors cursor-pointer">
                  <i className="ri-twitter-fill text-xl"></i>
                </button>
                <button className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center hover:bg-purple-700 transition-colors cursor-pointer">
                  <i className="ri-instagram-fill text-xl"></i>
                </button>
                <button className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center hover:bg-purple-700 transition-colors cursor-pointer">
                  <i className="ri-github-fill text-xl"></i>
                </button>
                <button className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center hover:bg-purple-700 transition-colors cursor-pointer">
                  <i className="ri-linkedin-fill text-xl"></i>
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-900 mb-2">
                  姓名
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all text-sm"
                  placeholder="请输入你的姓名"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
                  邮箱
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all text-sm"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-900 mb-2">
                  留言
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  maxLength={500}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all resize-none text-sm"
                  placeholder="想对我说些什么..."
                />
                <p className="text-xs text-gray-500 mt-1">最多500字</p>
              </div>

              {submitStatus === 'success' && (
                <div className="bg-green-50 text-green-700 px-4 py-3 rounded-lg flex items-center">
                  <i className="ri-checkbox-circle-fill mr-2"></i>
                  <span>消息发送成功！我会尽快回复你。</span>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="bg-red-50 text-red-700 px-4 py-3 rounded-lg flex items-center">
                  <i className="ri-error-warning-fill mr-2"></i>
                  <span>发送失败，请稍后重试。</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-all duration-300 hover-lift shadow-lg disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap cursor-pointer"
              >
                {isSubmitting ? '发送中...' : '发送消息'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
